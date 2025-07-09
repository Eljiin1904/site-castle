import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";
import { Database } from "@core/services/database";
import { AuthenticatedUser } from "@core/types/users/AuthenticatedUser";
import { UserUpdate } from "@core/types/users/UserUpdate";

interface BetSession {
  token: string;
  expires: Date;
}

interface UserState extends AuthenticatedUser {
  initialized: boolean | undefined;
  authenticated: boolean | undefined;
  restricted: boolean | undefined;
  betSession?: BetSession;
  demoMode?: boolean;
}

type UserInitialState = {
  authenticated: boolean;
  user?: AuthenticatedUser;
};

const initialState = {
  initialized: false,
  authenticated: false,
  restricted: false,
  demoMode: false,
  stats: {},
  settings: {},
  chestKeys: {},
  tfa: {},
  kyc: {},
  mute: {},
  suspension: {},
  ban: {},
  blockedUsers: new Array(),
  meta: {},
} as UserState;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: ({ reducer }) => ({
    initUser: reducer<UserInitialState>((state, { payload }) => {
      return {
        ...(payload.user || initialState),
        initialized: true,
        authenticated: payload.authenticated,
        restricted: state.restricted,
      };
    }),
    updateUser: reducer<UserUpdate>((state, { payload }) => {
      Database.updateDocument({
        document: state,
        ...payload,
      });
    }),
    setRestricted: reducer((state) => {
      state.restricted = true;
    }),
    setBetToken: reducer<string>((state, { payload }) => {
      state.betSession = {
        token: payload,
        expires: addHours(Date.now(), 23),
      };
    }),
    resetUser: () => {
      return {
        ...initialState,
        initialized: true,
      };
    },
    setDemoMode: reducer<boolean>((state, { payload }) => {
      state.demoMode = payload;
    })
  }),
});

export const { initUser, updateUser, setRestricted, setBetToken, resetUser, setDemoMode } = userSlice.actions;
