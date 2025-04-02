import { createSlice } from "@reduxjs/toolkit";
import { MinesInitialState } from "@core/types/mines/MinesInitialState";
import { MinesEventDocument } from "@core/types/mines/MinesEventDocument";
import { MinesMode } from "@core/types/mines/MinesMode";
import { MinesGameState } from "@core/types/mines/MinesGameState";
import { Mines } from "@core/services/mines";
import { Utility } from "@client/services/utility";

interface MinesState {
  initialized?: boolean;
  game?: MinesGameState;
  feed: MinesEventDocument[];
  mode: MinesMode;
  betAmount: number | undefined;
  gridSize: number;
  mineCount: number;
  autoIndexes: number[];
  gameCount?: number;
  winAction: PostAction;
  winIncreaseBy?: number;
  lossAction: PostAction;
  lossIncreaseBy?: number;
  profitLimit?: number;
  lossLimit?: number;
  autoPlaying?: boolean;
  autoPnl: number;
  animateIndexes: number[];
  inputQueue: number[];
  processing?: boolean;
}

type PostAction = "reset" | "increase";

const initialState: MinesState = {
  feed: [],
  mode: "manual",
  betAmount: Utility.getLocalInt("mines-bet-amount", 0),
  mineCount: Utility.getLocalInt("mines-bet-amount", 5),
  gridSize: Utility.getLocalInt("mines-bet-amount", 5),
  animateIndexes: [],
  autoIndexes: [],
  winAction: "reset",
  lossAction: "reset",
  autoPnl: 0,
  inputQueue: [],
};

export const minesSlice = createSlice({
  name: "minesPlayer",
  initialState,
  reducers: ({ reducer }) => ({
    initPlayer: reducer<MinesInitialState>((state, { payload }) => {
      state.game = payload.game;
      state.feed = payload.feed;

      state.mineCount = Mines.clampMineCount({
        gridSize: state.gridSize,
        mineCount: state.mineCount,
      });

      state.initialized = true;
    }),
    setGame: reducer<MinesGameState | undefined>((state, { payload }) => {
      state.game = payload;
    }),
    updateFeed: reducer<MinesEventDocument>((state, { payload }) => {
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
    setMode: reducer<MinesMode>((state, { payload }) => {
      state.mode = payload;
      state.game = undefined;
    }),
    setBetAmount: reducer<number | undefined>((state, { payload }) => {
      state.betAmount = payload;
      Utility.updateLocalInt("mines-bet-amount", payload);
    }),
    setGridSize: reducer<number>((state, { payload }) => {
      state.gridSize = payload;
      Utility.updateLocalInt("mines-grid-size", payload);

      state.game = undefined;
      state.autoIndexes = [];

      state.mineCount = Mines.clampMineCount({
        gridSize: state.gridSize,
        mineCount: state.mineCount,
      });
    }),
    setMineCount: reducer<number>((state, { payload }) => {
      state.mineCount = payload;
      Utility.updateLocalInt("mines-mine-count", payload);

      const maxReveals = Mines.getMaxReveals({
        gridSize: state.gridSize,
        mineCount: state.mineCount,
      });

      if (state.autoIndexes.length > maxReveals) {
        state.autoIndexes.length = maxReveals;
      }
    }),
    addAutoIndex: reducer<number>((state, { payload }) => {
      const tileIndex = payload;
      const selection = state.autoIndexes;

      if (selection.includes(tileIndex)) {
        selection.splice(selection.indexOf(tileIndex), 1);
      } else {
        const maxReveals = Mines.getMaxReveals({
          gridSize: state.gridSize,
          mineCount: state.mineCount,
        });

        if (selection.length < maxReveals) {
          selection.push(tileIndex);
        }
      }
    }),
    clearAutoIndexes: reducer((state) => {
      state.autoIndexes = [];
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
    nextAutoSequence: reducer<number>((state, { payload }) => {
      if (!state.game) {
        return;
      }

      const revealIndex = payload;

      state.game.reveals.push(revealIndex);
      state.game.revealCount = revealIndex + 1;
    }),
    setAnimateIndexes: reducer<number[]>((state, { payload }) => {
      state.animateIndexes = payload;
    }),
    addAnimateIndex: reducer<number>((state, { payload }) => {
      state.animateIndexes.push(payload);
    }),
    removeAnimateIndex: reducer<number>((state, { payload }) => {
      const indexes = state.animateIndexes;
      const index = indexes.indexOf(payload);

      if (index !== -1) {
        indexes.splice(index, 1);
      }
    }),
    setProcessing: reducer<boolean>((state, { payload }) => {
      state.processing = payload;
    }),
    enqueueReveal: reducer<number>((state, { payload }) => {
      state.inputQueue.push(payload);
    }),
    dequeueReveal: reducer<number>((state, { payload }) => {
      const queue = state.inputQueue;
      queue.splice(queue.indexOf(payload), 1);
    }),
    dropInputQueue: reducer((state) => {
      state.inputQueue = [];
    }),
    resetPlayer: reducer((state) => {
      state.autoPlaying = false;
      state.processing = false;
      state.game = undefined;
      state.animateIndexes = [];
      state.inputQueue = [];
    }),
  }),
});

export const {
  initPlayer,
  setGame,
  updateFeed,
  setMode,
  setBetAmount,
  setGridSize,
  setMineCount,
  addAutoIndex,
  clearAutoIndexes,
  setGameCount,
  setWinAction,
  setWinIncreaseBy,
  setLossAction,
  setLossIncreaseBy,
  setProfitLimit,
  setLossLimit,
  setAutoPlaying,
  setAutoPnl,
  nextAutoSequence,
  setAnimateIndexes,
  addAnimateIndex,
  removeAnimateIndex,
  setProcessing,
  enqueueReveal,
  dequeueReveal,
  dropInputQueue,
  resetPlayer,
} = minesSlice.actions;
