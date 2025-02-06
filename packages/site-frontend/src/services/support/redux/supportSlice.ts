import { createSlice } from "@reduxjs/toolkit";

interface SupportState {
  booted?: boolean;
  processing?: boolean;
}

const initialState: SupportState = {};

export const supportSlice = createSlice({
  name: "support",
  initialState,
  reducers: ({ reducer }) => ({
    setBooted: reducer<boolean>((state, { payload }) => {
      state.booted = payload;
    }),
    setProcessing: reducer<boolean>((state, { payload }) => {
      state.processing = payload;
    }),
  }),
});

export const { setBooted, setProcessing } = supportSlice.actions;
