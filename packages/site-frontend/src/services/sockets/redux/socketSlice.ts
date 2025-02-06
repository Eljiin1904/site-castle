import { createSlice } from "@reduxjs/toolkit";

interface SocketState {
  connected: boolean;
}

const initialState: SocketState = {
  connected: false,
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: ({ reducer }) => ({
    setConnected: reducer<boolean>((state, { payload }) => {
      state.connected = payload;
    }),
  }),
});

export const { setConnected } = socketSlice.actions;
