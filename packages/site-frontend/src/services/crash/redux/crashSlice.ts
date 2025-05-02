import { createSlice } from "@reduxjs/toolkit";
import { StreamUpdate } from "@core/types/database/DatabaseStreamEvent";
import { Database } from "@core/services/database";
import { Utility } from "@client/services/utility";
import { CrashRoundDocument } from "@core/types/crash/CrashRoundDocument";
import { CrashTicketDocument } from "@core/types/crash/CrashTicketDocument";
import { CrashRoundStatus } from "@core/types/crash/CrashRoundStatus";
import { CrashInitialState } from "@core/types/crash/CrashInitialState";

interface CrashState {
  initialized?: boolean;
  round: CrashRoundDocument;
  history: number[];
  tickets: CrashTicketDocument[];
  betAmount: number | undefined;
  lobby?: CrashRoundStatus;
  processing?: boolean;
}

const initialState: CrashState = {
  round: {} as CrashRoundDocument,
  history: [],
  tickets: [],
  betAmount: Utility.getLocalInt("crash-bet-amount", 0),
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
    setBetAmount: reducer<number | undefined>((state, { payload }) => {
      state.betAmount = payload;
      Utility.updateLocalInt("crash-bet-amount", payload);
    }),
    setProcessing: reducer<boolean>((state, { payload }) => {
      state.processing = payload;
    }),
    resetPlayer: () => initialState,
  }),
});

export const {
  initPlayer,
  changeRound,
  updateRound,
  updateBets,
  setProcessing,
  setBetAmount,
  resetPlayer,
} = crashSlice.actions;
