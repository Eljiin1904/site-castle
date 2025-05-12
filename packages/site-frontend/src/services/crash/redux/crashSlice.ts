import { createSlice } from "@reduxjs/toolkit";
import { StreamUpdate } from "@core/types/database/DatabaseStreamEvent";
import { Database } from "@core/services/database";
import { Utility } from "@client/services/utility";
import { CrashRoundDocument } from "@core/types/crash/CrashRoundDocument";
import { CrashTicketDocument } from "@core/types/crash/CrashTicketDocument";
import { CrashRoundStatus } from "@core/types/crash/CrashRoundStatus";
import { CrashInitialState } from "@core/types/crash/CrashInitialState";
import { CrashMode } from "@core/types/crash/CrashMode";

interface CrashState {
  initialized?: boolean;
  round: CrashRoundDocument;
  history: number[];
  tickets: CrashTicketDocument[];
  betAmount: number | undefined;
  targetMultiplier?: number;
  lobby?: CrashRoundStatus;
  processing?: boolean;
  mode: CrashMode;
}

const initialState: CrashState = {
  round: {} as CrashRoundDocument,
  history: [],
  tickets: [],
  betAmount: Utility.getLocalInt("crash-bet-amount", 0),
  targetMultiplier: 1,
  mode: "manual"
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
    }),
    changeRound: reducer<CrashRoundDocument>((state, { payload }) => {
      state.round = payload;
      state.tickets = [];
      state.lobby = undefined;
    }),
    updateRound: reducer<StreamUpdate>((state, { payload }) => {
      const update = payload;

      state.lobby = undefined;

      Database.updateDocument({
        document: state.round,
        updatedFields: update.updatedFields,
        removedFields: update.removedFields,
      });

      if (state.round.status === "completed") {
        const history = state.history.slice();

        history.unshift(state.round.multiplierCrash);

        if (history.length > 100) {
          history.pop();
        }

        state.history = history;
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
    setMode: reducer<CrashMode>((state, { payload }) => {
      state.mode = payload;
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
  setBetAmount,
  seTargetMultiplier,
  resetPlayer,
  setMode
} = crashSlice.actions;
