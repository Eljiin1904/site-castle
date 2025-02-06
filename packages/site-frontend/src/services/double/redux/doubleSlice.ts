import { createSlice } from "@reduxjs/toolkit";
import { DoubleRoundDocument } from "@core/types/double/DoubleRoundDocument";
import { DoubleTicketDocument } from "@core/types/double/DoubleTicketDocument";
import { DoubleInitialState } from "@core/types/double/DoubleInitialState";
import { DoubleRoll } from "@core/types/double/DoubleRoll";
import { StreamUpdate } from "@core/types/database/DatabaseStreamEvent";
import { Database } from "@core/services/database";
import { DoubleRoundStatus } from "@core/types/double/DoubleRoundStatus";
import { Utility } from "@client/services/utility";

interface DoubleState {
  initialized?: boolean;
  round: DoubleRoundDocument;
  history: DoubleRoll[];
  tickets: DoubleTicketDocument[];
  betAmount: number | undefined;
  lobby?: DoubleRoundStatus;
  processing?: boolean;
}

const initialState: DoubleState = {
  round: {} as DoubleRoundDocument,
  history: [],
  tickets: [],
  betAmount: Utility.getLocalInt("double-bet-amount", 0),
};

export const doubleSlice = createSlice({
  name: "doublePlayer",
  initialState,
  reducers: ({ reducer }) => ({
    initPlayer: reducer<DoubleInitialState>((state, { payload }) => {
      state.round = payload.round;
      state.history = payload.history;
      state.tickets = payload.tickets.filter((x) => x.roundId === state.round._id);
      state.lobby = payload.round.status;
      state.initialized = true;
    }),
    changeRound: reducer<DoubleRoundDocument>((state, { payload }) => {
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

        history.unshift(state.round.roll);

        if (history.length > 100) {
          history.pop();
        }

        state.history = history;
      }
    }),
    updateBets: reducer<DoubleTicketDocument>((state, { payload }) => {
      state.tickets.push(payload);
    }),
    setBetAmount: reducer<number | undefined>((state, { payload }) => {
      state.betAmount = payload;
      Utility.updateLocalInt("double-bet-amount", payload);
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
} = doubleSlice.actions;
