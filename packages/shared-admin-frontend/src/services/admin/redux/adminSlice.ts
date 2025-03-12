import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AdminUser } from "@core/types/admin/AdminUser";

interface AdminState extends AdminUser {
  initialized: boolean | undefined;
  authenticated: boolean | undefined;
}

const initialState: AdminState = {
  initialized: false,
  authenticated: false,
} as AdminState;

export const adminSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initAdmin: (
      state,
      action: PayloadAction<{
        authenticated: boolean;
        user?: AdminUser;
      }>,
    ) => {
      return {
        ...(action.payload.user || initialState),
        initialized: true,
        authenticated: action.payload.authenticated,
      };
    },
    logoutAdmin: () => {
      return {
        ...initialState,
        initialized: true,
      };
    },
  },
});

export const { initAdmin, logoutAdmin } = adminSlice.actions;
