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
import { CrashMultiplierInGameDetails } from "@core/types/crash/CrashMultiplierInGameDetails";

type PostAction = "reset" | "increase";

interface CrashState {
  initialized?: boolean;
  round: CrashRoundDocument;
  elapsedTime?: number;
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
}

const initialState: CrashState = {
  round: {} as CrashRoundDocument,
  elapsedTime: 0,
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
      state.elapsedTime = payload.elapsedTime ?? 0;
    }),
    changeRound: reducer<CrashRoundDocument>((state, { payload }) => {
      state.round = payload;
      state.elapsedTime = 0;
      state.tickets = [];
      state.crashEvents = [];
      state.lobby = undefined;
      state.betNextRound = false;
    }),
    updateRound: reducer<StreamUpdate>((state, { payload }) => {
      const update = payload;
      state.lobby = undefined;
      
      if(update.updatedFields.status) {

        const updatedStatus = update.updatedFields.status as CrashRoundStatus;
        state.round.status = updatedStatus;
          
        if( updatedStatus === "completed") {
          const multiplier = update.updatedFields.multiplier as number;
          const won = update.updatedFields.won as boolean;
    
          //Add multiplier to History
          const history = state.history.slice();
          history.unshift({multiplier, won});
          if (history.length > 100) {
            history.pop();
          }
          state.history = history;
          state.round.multiplier = multiplier;
        }

        Database.updateDocument({
          document: state.round,
          updatedFields: update.updatedFields,
          removedFields: update.removedFields,
       });
      }

      Database.updateDocument({
        document: state.round,
        updatedFields: update.updatedFields,
        removedFields: update.removedFields,
      });
    }),
    updateMultiplier: reducer<CrashMultiplierInGameDetails>((state, { payload }) => {

      const elapsedTime = payload.elapsedTime;
      const completed = payload.completed;
      const multiplier = payload.multiplier;

      if(completed) {
        state.round.status = "completed";
        state.elapsedTime = elapsedTime;
        state.round.multiplier = multiplier;
      }
      else {
        state.round.status = "simulating";
        state.elapsedTime = elapsedTime;
      }
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
    resetCrashEvents: (state) => {
      state.crashEvents = [];
    },
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
  updateMultiplier,
  setProcessing,
  addCrashEvent,
  resetCrashEvents,
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
