import { createSlice } from "@reduxjs/toolkit";
import { StreamUpdate } from "@core/types/database/DatabaseStreamEvent";
import { Database } from "@core/services/database";
import { Utility } from "@client/services/utility";
import { CrashRoundDocument } from "@core/types/crash/CrashRoundDocument";
import { CrashTicketDocument } from "@core/types/crash/CrashTicketDocument";
import { CrashRoundStatus } from "@core/types/crash/CrashRoundStatus";
import { CrashInitialState } from "@core/types/crash/CrashInitialState";
import { CrashMode } from "@core/types/crash/CrashMode";
import { CrashEventProps } from "#app/types/crash/CrashEventProps";
import { CrashControlMode } from "@core/types/crash/CrashControlMode";
import { Crash } from "..";
import { Crash as CoreCrash } from "@core/services/crash";

type PostAction = "reset" | "increase";
const DELAY = CoreCrash.roundTimes.delay;
interface CrashState {
  initialized?: boolean;
  round: CrashRoundDocument;
  history: {multiplier: number, won: boolean}[];
  tickets: CrashTicketDocument[];
  betAmount: number | undefined;
  targetMultiplier?: number;
  lobby?: CrashRoundStatus;
  processing?: boolean;
  mode: CrashMode;
  autoMode: CrashControlMode;
  crashEvents: CrashEventProps[];
  autoPlaying?: boolean;
  betNextRound?: boolean;
  gameCount?: number;
  winAction: PostAction;
  winIncreaseBy?: number;
  lossAction: PostAction;
  lossIncreaseBy?: number;
  profitLimit?: number;
  lossLimit?: number;
  autoPnl: number;
  roundElapsedTime?: number;
  roundStartingTime?: number;
}

const initialState: CrashState = {
  round: {} as CrashRoundDocument,
  history: [],
  tickets: [],
  betAmount: Utility.getLocalInt("crash-bet-amount", 0),
  targetMultiplier: Utility.getLocalFloat("crash-target-multiplier", 1),
  mode: "manual",
  autoMode: "controls",
  crashEvents: [],
  autoPlaying: false,
  betNextRound: false,
  winAction: "reset",
  lossAction: "reset",
  autoPnl: 0,
  roundElapsedTime: 0,
  roundStartingTime: 0,
};

export const crashSlice = createSlice({
  name: "crashPlayer",
  initialState,
  reducers: ({ reducer }) => ({
    initPlayer: reducer<CrashInitialState>((state, { payload }) => {
      state.round = payload.round;
      state.history = payload.history;
      state.tickets = payload.tickets.filter((x) => x.roundId === state.round._id);
      state.lobby = payload.round.status;
      state.initialized = true;
      state.roundElapsedTime = payload.round.elapsedTime;
      state.roundStartingTime = Date.now() - payload.round.elapsedTime + DELAY; // Adjust for the initial delay
    }),
    changeRound: reducer<CrashRoundDocument>((state, { payload }) => {
      state.round = payload;
      state.tickets = [];
      state.crashEvents = [];
      state.lobby = undefined;
      state.roundElapsedTime = 0;
      state.roundStartingTime = 0;
    }),
    updateRound: reducer<StreamUpdate>((state, { payload }) => {
      const update = payload;
      state.lobby = undefined;
      
      if(update.updatedFields.status) {

        const updatedStatus = update.updatedFields.status as CrashRoundStatus;
        if( updatedStatus === "completed") {
          // state.round.statusDate = update.updatedFields.statusDate as Date;
          state.round.status = updatedStatus;
          const crashedMultiplier = update.updatedFields.multiplierCrash as number;
          const won = update.updatedFields.won as boolean;
    
          //Add multiplier to History
          const history = state.history.slice();
          state.roundElapsedTime = 0;
          history.unshift({multiplier: crashedMultiplier, won: won});
          if (history.length > 100) {
            history.pop();
          }
          state.history = history;

          const pixelsDown = Crash.chart.offset;
          const crashLength = Crash.getMultiplierPosition(crashedMultiplier);

          const crashEvent: CrashEventProps = {
            crashColor: "double-red",
            crashLength: crashLength + pixelsDown,
            startedCrashLength: crashLength + pixelsDown,
            crashPosition: -pixelsDown,
            startedLine: true,
            completedLine: true,
          };

          const multiplierEvent: CrashEventProps = {
            crashColor: "bright-green",
            crashLength: crashLength,
            startedCrashLength: 0,
            crashPosition: 0,
            startedLine: true,
            simulatingLine: true,
          };
          
          if (state.crashEvents) {
            let updatedCrashEvents = state.crashEvents.filter(x => !x.simulatingLine).map(event => {
              
              event.crashLength = Math.max(0, event.startedCrashLength - state.round.multiplier);
              return event;
            });
            updatedCrashEvents.push(multiplierEvent);
            updatedCrashEvents = updatedCrashEvents.filter(x => !x.completedLine);
            updatedCrashEvents.push(crashEvent);
            state.crashEvents = updatedCrashEvents;
          }
        }

        if( updatedStatus === "simulating") {
         
          if(state.round.status === "completed") 
            return;

          state.round.status = updatedStatus;
          state.roundElapsedTime = 0;
          state.roundStartingTime = Date.now();
          const multiplier = 1.00;
          const multiplierEvent: CrashEventProps = {
            crashColor: "bright-green",
            crashLength: Crash.getMultiplierPosition(multiplier),
            startedCrashLength: 0,
            crashPosition: 0,
            startedLine: true,
            simulatingLine: true,
          };
          
          if (state.crashEvents) {
            const updatedCrashEvents = state.crashEvents.filter(x => !x.simulatingLine).map(event => {
              
              event.crashLength = Math.max(0, event.startedCrashLength - state.round.multiplier);
              return event;
            });
            
            updatedCrashEvents.push(multiplierEvent);
            state.crashEvents = updatedCrashEvents;
          }

          if(state.crashEvents.length === 0) {
            state.crashEvents = [multiplierEvent];
          }
        }
        else 
        {
          state.round.status = updatedStatus;
          state.roundStartingTime = 0;
        }
      }

      if(update.updatedFields.multiplier){

        if(state.round.status != "simulating") 
          return;
        
        const multiplier = update.updatedFields.multiplier as number;
        const elapsedTime = update.updatedFields.elapsedTime as number;
        const linePosition = Crash.getMultiplierPosition(multiplier);
        state.roundElapsedTime = elapsedTime;
        state.round.multiplier = multiplier;

        const multiplierEvent: CrashEventProps = {
          crashColor: "bright-green",
          crashLength: linePosition,
          startedCrashLength: 0,
          crashPosition: 0,
          startedLine: true,
          simulatingLine: true,
        };

        if (state.crashEvents) {
          const updatedCrashEvents = state.crashEvents.filter(x => !x.simulatingLine).map(event => {
            
            event.crashLength = Math.max(0, event.startedCrashLength - state.round.multiplier);
            return event;
          });
          
          updatedCrashEvents.push(multiplierEvent);
          state.crashEvents = updatedCrashEvents;
        }

        if(state.crashEvents.length === 0) {
          state.crashEvents = [multiplierEvent];
        }
      }

      Database.updateDocument({
        document: state.round,
        updatedFields: update.updatedFields,
        removedFields: update.removedFields,
      });
    }),
    updateBets: reducer<CrashTicketDocument>((state, { payload }) => {
      state.tickets.push(payload);
    }),
    updateBet: reducer<StreamUpdate>((state, { payload }) => {
      
      const update = payload;
      const ticket = state.tickets.find((x) => x._id === update.documentId);
      if (!ticket) {
        return;
      }
      Database.updateDocument({
        document: ticket,
        updatedFields: update.updatedFields,
        removedFields: update.removedFields,
      });
      state.tickets = state.tickets.map((x) => {
        if (x._id === ticket._id) {
          return ticket;
        }
        return x;
      });      
    }),
    setBetAmount: reducer<number | undefined>((state, { payload }) => {
      state.betAmount = payload;
      Utility.updateLocalInt("crash-bet-amount", payload);
    }),
    seTargetMultiplier: reducer<number | undefined>((state, { payload }) => {
      state.targetMultiplier = payload;
      Utility.updateLocalInt("crash-target-multiplier", payload);
    }),
    setProcessing: reducer<boolean>((state, { payload }) => {
      state.processing = payload;
    }),
    addCrashEvent: reducer<CrashEventProps>((state, { payload }) => {
      if (state.crashEvents) {
        const crashEvents = state.crashEvents.slice();
        crashEvents.push(payload);
        if (crashEvents.length > 10) {
          crashEvents.shift();
        }
        state.crashEvents = crashEvents;
      } else {
        state.crashEvents = [payload];
      }
    }),
    setMode: reducer<CrashMode>((state, { payload }) => {
      state.mode = payload;
    }),
    setAutoMode: reducer<CrashControlMode>((state, { payload }) => {
      state.autoMode = payload;
    }),
    setGameCount: reducer<number | undefined>((state, { payload }) => {
      state.gameCount = payload;
    }),
    setWinAction: reducer<PostAction>((state, { payload }) => {
      state.winAction = payload;
    }),
    setWinIncreaseBy: reducer<number | undefined>((state, { payload }) => {
      state.winIncreaseBy = payload;
    }),
    setLossAction: reducer<PostAction>((state, { payload }) => {
      state.lossAction = payload;
    }),
    setLossIncreaseBy: reducer<number | undefined>((state, { payload }) => {
      state.lossIncreaseBy = payload;
    }),
    setProfitLimit: reducer<number | undefined>((state, { payload }) => {
      state.profitLimit = payload;
    }),
    setLossLimit: reducer<number | undefined>((state, { payload }) => {
      state.lossLimit = payload;
    }),
    setAutoPlaying: reducer<boolean>((state, { payload }) => {
      state.autoPlaying = payload;
    }),
    setBetNextRound: reducer<boolean>((state, { payload }) => {
      state.betNextRound = payload;
    }),
    setAutoPnl: reducer<number>((state, { payload }) => {
      state.autoPnl = payload;
    }),
    resetPlayer: () => initialState,
  }),
});

export const {
  initPlayer,
  changeRound,
  updateRound,
  updateBets,
  updateBet,
  setProcessing,
  addCrashEvent,
  setBetAmount,
  seTargetMultiplier,
  setGameCount,
  setWinAction,
  setWinIncreaseBy,
  setLossAction,
  setLossIncreaseBy,
  setProfitLimit,
  setLossLimit,
  setAutoPlaying,
  setAutoPnl,
  resetPlayer,
  setMode,
  setAutoMode,
  setBetNextRound
} = crashSlice.actions;
