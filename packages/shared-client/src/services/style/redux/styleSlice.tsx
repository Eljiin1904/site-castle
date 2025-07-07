import { createSlice } from "@reduxjs/toolkit";
import { getLayout } from "../utils/getLayout";

export interface StyleState {
  bodyLayout: Layout;
  mainLayout: Layout;
  theatreMode?: boolean;
}

const defaultLayout = getLayout(window.innerWidth);

const initialState: StyleState = {
  bodyLayout: defaultLayout,
  mainLayout: defaultLayout,
  theatreMode: false,
};

export const styleSlice = createSlice({
  name: "style",
  initialState,
  reducers: ({ reducer }) => ({
    setBodyLayout: reducer<Layout>((state, { payload }) => {
      state.bodyLayout = payload;
    }),
    setMainLayout: reducer<Layout>((state, { payload }) => {
      state.mainLayout = payload;
    }),
    setTheatreMode: reducer<boolean>((state, { payload }) => {
      state.theatreMode = payload;
    })
  }),
});

export const { setBodyLayout, setMainLayout , setTheatreMode} = styleSlice.actions;
