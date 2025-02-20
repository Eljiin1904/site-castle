import { createSlice } from "@reduxjs/toolkit";
import { LimboInitialState } from "@core/types/limbo/LimboInitialState";
import { LimboTicketDocument } from "@core/types/limbo/LimboTicketDocument";
import { LimboMode } from "@core/types/limbo/LimboMode";
import { LimboRoll, LimboFeedRoll } from "@core/types/limbo/LimboRoll";
import { Numbers } from "@core/services/numbers";
import { Utility } from "@client/services/utility";
import { Limbo } from "#app/services/limbo";

interface LimboState {
  initialized?: boolean;
  history: LimboRoll[];
  feed: LimboFeedRoll[];
  mode: LimboMode;
  betAmount: number | undefined;
  targetValue: number;
  lastTicket?: LimboTicketDocument;
  gameCount?: number;
  winAction: PostAction;
  winIncreaseBy?: number;
  lossAction: PostAction;
  lossIncreaseBy?: number;
  profitLimit?: number;
  lossLimit?: number;
  autoPlaying?: boolean;
  autoPnl: number;
  processing?: boolean;
}

type PostAction = "reset" | "increase";

const initialState: LimboState = {
  history: [],
  feed: [],
  mode: "manual",
  betAmount: Utility.getLocalInt("limbo-bet-amount", 0),
  targetValue: Limbo.getTargetFromMultiplier(2),
  lossAction: "reset",
  winAction: "reset",
  autoPnl: 0,
};

export const limboSlice = createSlice({
  name: "limboPlayer",
  initialState,
  reducers: ({ reducer }) => ({
    initPlayer: reducer<LimboInitialState>((state, { payload }) => {
      state.history = payload.history || [];
      state.feed = payload.feed || [];
      state.initialized = true;
    }),
    updateHistory: reducer<LimboTicketDocument>((state, { payload }) => {
      const history = state.history.slice();

      history.unshift({
        _id: payload._id,
        targetValue: payload.targetValue,
        rollValue: payload.rollValue,
        rollMultiplier: payload.rollMultiplier,
        won: payload.won,
      });

      if (history.length > 5) {
        history.pop();
      }

      state.history = history;

      state.lastTicket = payload;
    }),
    updateFeed: reducer<LimboTicketDocument>((state, { payload }) => {
      const feed = state.feed.slice();

      feed.unshift({
        ...payload,
        inserted: true,
      });

      if (feed.length > 10) {
        feed.pop();
      }

      state.feed = feed;
    }),
    clearLastTicket: reducer((state, { payload }) => {
      state.lastTicket = undefined;
    }),
    setMode: reducer<LimboMode>((state, { payload }) => {
      state.mode = payload;
    }),
    setBetAmount: reducer<number | undefined>((state, { payload }) => {
      state.betAmount = payload;
      Utility.updateLocalInt("limbo-bet-amount", payload);
    }),
    setTargetValue: reducer<number>((state, { payload }) => {
      const { min, max } = Limbo.getTargetMinMax();
      state.targetValue = Numbers.clamp(payload, min, max);
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
    setAutoPnl: reducer<number>((state, { payload }) => {
      state.autoPnl = payload;
    }),
    setProcessing: reducer<boolean>((state, { payload }) => {
      state.processing = payload;
    }),
    resetPlayer: reducer((state) => {
      state.autoPlaying = false;
      state.processing = false;
      state.lastTicket = undefined;
    }),
  }),
});

export const {
  initPlayer,
  updateHistory,
  updateFeed,
  clearLastTicket,
  setMode,
  setBetAmount,
  setTargetValue,
  setGameCount,
  setWinAction,
  setWinIncreaseBy,
  setLossAction,
  setLossIncreaseBy,
  setProfitLimit,
  setLossLimit,
  setAutoPlaying,
  setAutoPnl,
  setProcessing,
  resetPlayer,
} = limboSlice.actions;
