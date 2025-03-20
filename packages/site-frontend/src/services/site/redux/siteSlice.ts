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
import { GameKindType } from "@core/services/game/Game";

interface SiteState {
  initialized?: boolean;
  title?: string;
  menuPanelCollapsed: boolean;
  menuPanelCollapsedChanged?: boolean;
  menuOverlayOpen?: boolean;
  settings: SiteSettingObject;
  meta: SiteMetaObject;
  activity?: ActivityData[];
  bets?: BetData[];
  games?: GameDocument[];
  search?: string;
  filter?: Game.GameKindType;
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

type BetData = SiteBetDocument & {
  inserted?: boolean;
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
    initBets: reducer<SiteBetDocument[] | undefined>((state, { payload }) => {
      state.bets = payload;
    }),
    updateBets: reducer<SiteBetDocument>((state, { payload }) => {
      const bets = state.bets ? state.bets.slice() : [];

      bets.unshift({
        ...payload,
        inserted: true,
      });

      if (bets.length > Site.betLogSize) {
        bets.pop();
      }

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
  setFilter
} = siteSlice.actions;
