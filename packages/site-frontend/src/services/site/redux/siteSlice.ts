import { createSlice } from "@reduxjs/toolkit";
import { SiteMetaId, SiteMetaObject, SiteMetaValue } from "@core/types/site/SiteMetaDocument";
import {
  SiteSettingId,
  SiteSettingObject,
  SiteSettingValue,
} from "@core/types/site/SiteSettingDocument";
import { SiteActivityDocument } from "@core/types/site/SiteActivityDocument";
import { SiteBetDocument } from "@core/types/site/SiteBetDocument";
import { Utility } from "@client/services/utility";
import { Site } from "@core/services/site";
import { GameDocument } from "@core/types/game/GameDocument";
import { Game } from "@core/services/game";
import { GameKindType, GameSortType } from "@core/services/game/Game";
import { HotSiteGameDetails } from "@core/types/site/HotSiteGame";
import { SiteGame } from "@core/types/site/SiteGame";

interface SiteState {
  initialized?: boolean;
  title?: string;
  menuPanelCollapsed: boolean;
  menuPanelCollapsedChanged?: boolean;
  menuOverlayOpen?: boolean;
  settings: SiteSettingObject;
  meta: SiteMetaObject;
  activity?: ActivityData[];
  bets?: BetBoardData;
  games?: GameDocument[];
  hotGames?: HotSiteGameDetails[];
  search?: string;
  filter?: Game.GameKindType;
  sortBy?: Game.GameSortType;
}

type SettingUpdate = {
  key: SiteSettingId;
  value: SiteSettingValue;
};

type MetaUpdate = {
  key: SiteMetaId;
  value: SiteMetaValue;
};

type ActivityData = SiteActivityDocument & {
  inserted?: boolean;
};

export type BetData = SiteBetDocument & {
  inserted?: boolean;
};

type BetBoardData = {
  all: BetData[];
  blackjack: BetData[];
  "case-battles": BetData[];
  cases: BetData[];
  dice: BetData[];
  double: BetData[];
  limbo: BetData[];
  mines: BetData[];
  crash: BetData[];
};

const initialState: SiteState = {
  menuPanelCollapsed: Utility.getLocalBool("menu-collapsed", false),
  settings: {} as SiteSettingObject,
  meta: {} as SiteMetaObject,
};

export const siteSlice = createSlice({
  name: "site",
  initialState,
  reducers: ({ reducer }) => ({
    setTitle: reducer<string | undefined>((state, { payload }) => {
      state.title = payload;
    }),
    collapseMenuPanel: reducer<boolean>((state, { payload }) => {
      state.menuPanelCollapsed = payload;
      state.menuPanelCollapsedChanged = true;
      Utility.updateLocalBool("menu-collapsed", payload);
    }),
    toggleMenuOverlay: reducer<boolean>((state, { payload }) => {
      state.menuOverlayOpen = payload;
    }),
    initMeta: reducer<SiteMetaObject>((state, { payload }) => {
      state.meta = payload;
      state.initialized = true;
    }),
    updateMeta: reducer<MetaUpdate>((state, { payload }) => {
      (state.meta as any)[payload.key] = payload.value;
    }),
    initSettings: reducer<SiteSettingObject>((state, { payload }) => {
      state.settings = payload;
    }),
    updateSetting: reducer<SettingUpdate>((state, { payload }) => {
      (state.settings as any)[payload.key] = payload.value;
    }),
    initActivity: reducer<SiteActivityDocument[] | undefined>((state, { payload }) => {
      state.activity = payload;
    }),
    updateActivity: reducer<SiteActivityDocument>((state, { payload }) => {
      const activity = state.activity ? state.activity.slice() : [];

      activity.unshift({
        ...payload,
        inserted: true,
      });

      if (activity.length > Site.activityLogSize) {
        activity.pop();
      }

      state.activity = activity;
    }),
    initBets: reducer<BetBoardData | undefined>((state, { payload }) => {
      state.bets = payload;
    }),
    updateBets: reducer<SiteBetDocument>((state, { payload }) => {
      const allBets = state.bets?.all ? state.bets.all.slice() : [];
      const doubleBets = replaceBet(
        state.bets?.double ? state.bets.double.slice() : [],
        "double",
        payload,
      );
      const diceBets = replaceBet(state.bets?.dice ? state.bets.dice.slice() : [], "dice", payload);
      const limboBets = replaceBet(
        state.bets?.limbo ? state.bets.limbo.slice() : [],
        "limbo",
        payload,
      );
      const caseBets = replaceBet(
        state.bets?.cases ? state.bets.cases.slice() : [],
        "cases",
        payload,
      );
      const minesBets = replaceBet(
        state.bets?.mines ? state.bets.mines.slice() : [],
        "mines",
        payload,
      );

      const blackjackBets = replaceBet(
        state.bets?.blackjack ? state.bets.blackjack.slice() : [],
        "blackjack",
        payload,
      );
      const caseBattleBets: BetData[] = []; //replaceBet(state.bets?.["case-battles"] ? state.bets["case-battles"].slice() : [], "case-battles", payload);
      const crashBets = replaceBet(state.bets?.crash ? state.bets.crash.slice() : [], "crash", payload);

      allBets.unshift({
        ...payload,
        inserted: true,
      });
      if (allBets.length > Site.betLogSize) {
        allBets.pop();
      }

      const bets = {
        all: allBets,
        "case-battles": caseBattleBets,
        cases: caseBets,
        dice: diceBets,
        double: doubleBets,
        limbo: limboBets,
        mines: minesBets,
        blackjack: blackjackBets,
        crash: crashBets };

      state.bets = bets;
    }),
    initGames: reducer<GameDocument[] | []>((state, { payload }) => {
      state.games = payload;
    }),
    setSearch: reducer<string | undefined>((state, { payload }) => {
      state.search = payload;
    }),
    setFilter: reducer<GameKindType | undefined>((state, { payload }) => {
      state.filter = payload;
    }),
    setSort: reducer<GameSortType | undefined>((state, { payload }) => {
      state.sortBy = payload;
    }),
    updateHotGames: reducer<HotSiteGameDetails[] | undefined>((state, { payload }) => {
      state.hotGames = payload;
    }),
  }),
});

export const {
  setTitle,
  collapseMenuPanel,
  toggleMenuOverlay,
  initMeta,
  updateMeta,
  initSettings,
  updateSetting,
  initActivity,
  updateActivity,
  initBets,
  updateBets,
  initGames,
  setSearch,
  setFilter,
  setSort,
  updateHotGames,
} = siteSlice.actions;

const replaceBet = (bets: BetData[], game: SiteGame, bet: SiteBetDocument) => {
  if (game === bet.game) {
    bets.unshift({
      ...bet,
      inserted: true,
    });
    if (bets.length > Site.betLogSize) {
      bets.pop();
    }
  }

  return bets;
};
