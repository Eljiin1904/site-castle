import { createSlice } from "@reduxjs/toolkit";
import { DiceInitialState } from "@core/types/dice/DiceInitialState";
import { DiceRoll } from "@core/types/dice/DiceRoll";
import { DiceFeedRoll } from "@core/types/dice/DiceRoll";
import { DiceMode } from "@core/types/dice/DiceMode";
import { DiceTargetKind } from "@core/types/dice/DiceTargetKind";
import { DiceTicketDocument } from "@core/types/dice/DiceTicketDocument";
import { Dice } from "@core/services/dice";
import { Numbers } from "@core/services/numbers";
import { Utility } from "@client/services/utility";

interface DiceState {
  initialized?: boolean;
  history: DiceRoll[];
  feed: DiceFeedRoll[];
  mode: DiceMode;
  betAmount: number | undefined;
  targetValue: number;
  targetKind: DiceTargetKind;
  lastTicket?: DiceTicketDocument;
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

const initialState: DiceState = {
  history: [],
  feed: [],
  mode: "manual",
  betAmount: Utility.getLocalInt("dice-bet-amount", 0),
  targetValue: 5200,
  targetKind: "over",
  winAction: "reset",
  lossAction: "reset",
  autoPnl: 0,
};

export const diceSlice = createSlice({
  name: "dicePlayer",
  initialState,
  reducers: ({ reducer }) => ({
    initPlayer: reducer<DiceInitialState>((state, { payload }) => {
      state.history = payload.history || [];
      state.feed = payload.feed || [];
      state.initialized = true;
    }),
    updateHistory: reducer<DiceTicketDocument>((state, { payload }) => {
      const history = state.history.slice();

      history.unshift({
        _id: payload._id,
        targetKind: payload.targetKind,
        targetValue: payload.targetValue,
        rollValue: payload.rollValue,
      });

      if (history.length > 12) {
        history.pop();
      }

      state.history = history;

      state.lastTicket = payload;
    }),
    updateFeed: reducer<DiceTicketDocument>((state, { payload }) => {
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
    setMode: reducer<DiceMode>((state, { payload }) => {
      state.mode = payload;
    }),
    setBetAmount: reducer<number | undefined>((state, { payload }) => {
      state.betAmount = payload;
      Utility.updateLocalInt("dice-bet-amount", payload);
    }),
    setTargetValue: reducer<number>((state, { payload }) => {
      const { min, max } = Dice.getTargetMinMax(state.targetKind);
      state.targetValue = Numbers.clamp(payload, min, max);
    }),
    setTargetKind: reducer<DiceTargetKind>((state, { payload }) => {
      state.targetKind = payload;
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
  setMode,
  setBetAmount,
  setTargetValue,
  setTargetKind,
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
} = diceSlice.actions;
