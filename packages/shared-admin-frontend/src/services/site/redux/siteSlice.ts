import { createSlice } from "@reduxjs/toolkit";
import {
  SiteMetaId,
  SiteMetaObject,
  SiteMetaValue,
} from "@core/types/site/SiteMetaDocument";
import {
  SiteSettingId,
  SiteSettingObject,
  SiteSettingValue,
} from "@core/types/site/SiteSettingDocument";

interface SiteState {
  title?: string;
  initialized?: boolean;
  settings: SiteSettingObject;
  meta: SiteMetaObject;
}

const initialState = {
  settings: {},
  meta: {},
} as SiteState;

export const siteSlice = createSlice({
  name: "site",
  initialState,
  reducers: (create) => ({
    setTitle: create.reducer<string | undefined>((state, { payload }) => {
      state.title = payload;
    }),
    initMeta: create.reducer<SiteMetaObject>((state, { payload }) => {
      state.meta = payload;
      state.initialized = true;
    }),
    initSettings: create.reducer<SiteSettingObject>((state, { payload }) => {
      state.settings = payload;
    }),
    updateMeta: create.reducer<{
      key: SiteMetaId;
      value: SiteMetaValue;
    }>((state, { payload }) => {
      (state.meta as any)[payload.key] = payload.value;
    }),
    updateSetting: create.reducer<{
      key: SiteSettingId;
      value: SiteSettingValue;
    }>((state, { payload }) => {
      (state.settings as any)[payload.key] = payload.value;
    }),
  }),
});

export const { setTitle, initMeta, initSettings, updateMeta, updateSetting } =
  siteSlice.actions;
