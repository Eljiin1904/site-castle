import { createSlice } from "@reduxjs/toolkit";
import { ChipValue } from "../constants/chipValues";
import { entries, keys } from "@core/services/utility/Utility";
import { getInitBetAmounts, maxBet } from "@core/services/blackjack/Blackjack";
import { World } from "../Blackjack";
import {
  BlackjackApiResponse,
  BlackjackClientGameData,
  BlackjackNextAction,
} from "@core/types/blackjack/BlackjackApiResponse";
import { BlackjackBetAmounts, BlackjackBetType } from "@core/types/blackjack/BlackjackBetAmounts";
import { setBetAmountForExistingGame } from "./helpers/setBetAmountForExistingGame";
import { BlackjackFeedMasked } from "@core/types/blackjack/BlackjackEventDocument";

type HistoryItem = {
  amount: number;
  betType: BlackjackBetType;
};
export type BjHistoryItem = HistoryItem;

type State = {
  checkExisting: boolean;
  loading: boolean;

  // redundant with loading atm
  // needs refactor
  processing: boolean;

  getExistingRequested: boolean;
  getExistingResponded: boolean;

  game: BlackjackClientGameData | null;
  nextAction: BlackjackNextAction[] | null;
  betting: {
    betAmounts: BlackjackBetAmounts;
    selectedValue: ChipValue | null;
    history: HistoryItem[][];
  };
  world: World;
  feed: (BlackjackFeedMasked & { inserted?: boolean })[];
  darkTheme: boolean;
  cardsDealt: boolean;
};
export type BjState = State;

const initialState: State = {
  checkExisting: true,
  getExistingRequested: false,
  getExistingResponded: false,
  loading: false, // could use nextAction, being explicit instead
  processing: false,
  game: null,
  nextAction: null,
  betting: {
    betAmounts: getInitBetAmounts(),
    selectedValue: null,
    history: [],
  },
  world: new World(), // switch to optional
  feed: [],
  darkTheme: true,
  cardsDealt: false,
};

type Init = {
  feed: BlackjackFeedMasked[];
};

export const blackjackSlice = createSlice({
  name: "blackjack",
  initialState,
  reducers: (create) => ({
    init: create.reducer<Init>((state, { payload }) => {
      state.feed = payload.feed;
    }),
    toggleDarkTheme: create.reducer<void>((state) => {
      state.darkTheme = !state.darkTheme;
    }),
    setCardsDealt: create.reducer<void>((state) => {
      state.cardsDealt = true;
      // setDisplayBetAmounts(state);
    }),

    updateFeed: create.reducer<BlackjackFeedMasked>((state, { payload }) => {
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

    // --- feed ---
    // reset: create.reducer<void>((state) => {
    //   // not in use
    // }),

    resetBetPage: create.reducer<void>((state) => {
      state.betting.selectedValue = null;
    }),

    setProcessing: create.reducer<boolean>((state, { payload }) => {
      state.processing = payload;
    }),

    triggerCheckExisting: create.reducer<void>((state, {}) => {
      state.checkExisting = false;
      state.loading = true;
    }),

    getExistingRequested: create.reducer<void>((state, {}) => {
      state.getExistingRequested = true;
    }),

    setGame: create.reducer<BlackjackApiResponse & { delayDraw?: boolean }>(
      (state, { payload: { game, nextAction, delayDraw } }) => {
        state.checkExisting = true;
        state.getExistingResponded = true;
        state.loading = false;
        state.processing = false;
        state.cardsDealt = false;
        state.game = game;
        state.nextAction = nextAction;
        if (game) {
          setBetAmountForExistingGame(state, { game });
          // queueDisplayBetAmounts(state);

          // delay for betting anim
          // TODO move this delay into the dealing sequence
          state.world.queueUpdateGame({ game, delay: delayDraw ? 250 : 0 });

          // make hmr happy
          // if (state.world) state.world.dismount();
          // state.world = new World({ game });
        }
      },
    ),

    clearGame: create.reducer<{ resetBetting: boolean }>((state, { payload }) => {
      const { resetBetting } = payload;
      state.game = null;
      state.nextAction = null;
      // state.initialized = false;

      // re-trigger getExistingGame in case it was created somewhere else?
      state.checkExisting = true;

      state.getExistingRequested = false;
      state.loading = false;

      state.cardsDealt = false;

      // clearDisplayBetAmounts(state);
      state.world.clear();

      if (resetBetting) {
        state.betting.selectedValue = null;
        state.betting.history = [];
        state.betting.betAmounts = getInitBetAmounts();
      }
    }),

    setSelectedValue: create.reducer<ChipValue>((state, { payload }) => {
      state.betting.selectedValue = payload;
    }),

    // addToBetType: create.reducer<{ betType: BlackjackBetType; tokenAmount: number }>(
    //   (state, { payload }) => {
    //     const { betType, tokenAmount } = payload;
    //     const {
    //       betting: { selectedValue },
    //     } = state;
    //     if (selectedValue === null) {
    //       // alert no value selected
    //       return;
    //     }
    //     addBetAmount(state, tokenAmount, {
    //       betType,
    //       amount: Intimal.fromDecimal(selectedValue),
    //     });
    //   },
    // ),

    addBetTypeAmounts: create.reducer<HistoryItem[] | HistoryItem>((state, { payload }) => {
      const { betAmounts } = state.betting;
      let items = payload;
      if (!Array.isArray(items)) items = [items];

      items.forEach(({ betType, amount }) => {
        betAmounts[betType] += amount;
      });
      state.betting.history.push(items);
    }),

    setBetTypeAmount: create.reducer<{
      betType: BlackjackBetType;
      amount: number;
    }>((state, { payload }) => {
      const { betType, amount } = payload;
      const { betAmounts } = state.betting;
      betAmounts[betType] = !Number.isNaN(amount) ? amount : 0;
      console.log(betAmounts[betType], betType);
      state.betting.history = [];
    }),

    clearBets: create.reducer<void>((state) => {
      const { betAmounts } = state.betting;
      state.betting.history = [];
      keys(betAmounts).forEach((key) => {
        betAmounts[key] = 0;
      });
    }),

    // doubleBets: create.reducer<void>((state) => {
    //   const { betAmounts } = state.betting;

    //   const items = entries(betAmounts).map(([betType, amount]) => ({
    //     betType,
    //     amount,
    //   }));
    //   // addBetAmount(state, items);
    // }),

    undoBet: create.reducer<void>((state) => {
      if (!state.betting.history.length) {
        return;
      }

      const item = state.betting.history.pop();
      if (!item) throw new Error("Blackjack no undo item");

      item.forEach(({ amount, betType }) => {
        state.betting.betAmounts[betType] += -amount;
      });
    }),

    // repeatBet: create.reducer<void>((state) => {
    //   const { history } = state.betting;
    //   if (!history.length) {
    //     // alert no history
    //     return;
    //   }
    //   const item = history[history.length - 1];
    //   // addBetAmount(state, item);
    // }),
  }),
});

export const {
  setProcessing,
  triggerCheckExisting,
  getExistingRequested,
  setGame,
  clearGame,
  setSelectedValue,
  setBetTypeAmount,
  clearBets,
  undoBet,
  init,
  updateFeed,
  // reset,
  toggleDarkTheme,
  setCardsDealt,

  addBetTypeAmounts,
} = blackjackSlice.actions;

// function queueDisplayBetAmounts(state: WritableDraft<State>) {
//   state.betting.queuedDisplayBetAmounts = state.betting.displayBetAmounts;
// }
// function setDisplayBetAmounts(state: WritableDraft<State>) {
//   state.betting.displayBetAmounts = state.betting.queuedDisplayBetAmounts;
// }
// function clearDisplayBetAmounts(state: WritableDraft<State>) {
//   state.betting.displayBetAmounts = null;
//   state.betting.queuedDisplayBetAmounts = null;
// }
