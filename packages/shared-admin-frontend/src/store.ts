import { configureStore } from "@reduxjs/toolkit";
import { styleSlice } from "@client/services/style/redux/styleSlice";
import { adminSlice } from "./services/admin/redux/adminSlice";
import { siteSlice } from "./services/site/redux/siteSlice";
import { socketSlice } from "./services/sockets/redux/socketSlice";

export const store = configureStore({
  reducer: {
    admin: adminSlice.reducer,
    site: siteSlice.reducer,
    socket: socketSlice.reducer,
    style: styleSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // TODO: Create middleware to handle Dates
    }),
});
