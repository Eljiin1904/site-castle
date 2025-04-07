import { configureStore } from "@reduxjs/toolkit";
import { styleSlice } from "@client/services/style/redux/styleSlice";
import { battleCreateSlice } from "./services/case-battles/redux/battleCreateSlice";
import { battleIndexSlice } from "./services/case-battles/redux/battleIndexSlice";
import { battlePlayerSlice } from "./services/case-battles/redux/battlePlayerSlice";
import { chatSlice } from "./services/chat/redux/chatSlice";
import { doubleSlice } from "./services/double/redux/doubleSlice";
import { diceSlice } from "./services/dice/redux/diceSlice";
import { holidaySlice } from "./services/rewards/redux/holidaySlice";
import { limboSlice } from "./services/limbo/redux/limboSlice";
import { notificationsSlice } from "./services/notifications/redux/notificationsSlice";
import { siteSlice } from "./services/site/redux/siteSlice";
import { socketSlice } from "./services/sockets/redux/socketSlice";
import { supportSlice } from "./services/support/redux/supportSlice";
import { userSlice } from "./services/users/redux/userSlice";
import { minesSlice } from "./services/mines/redux/minesSlice";

export const store = configureStore({
  reducer: {
    battleCreate: battleCreateSlice.reducer,
    battleIndex: battleIndexSlice.reducer,
    battlePlayer: battlePlayerSlice.reducer,
    chat: chatSlice.reducer,
    double: doubleSlice.reducer,
    dice: diceSlice.reducer,
    holiday: holidaySlice.reducer,
    limbo: limboSlice.reducer,
    mines: minesSlice.reducer,
    notifications: notificationsSlice.reducer,
    site: siteSlice.reducer,
    socket: socketSlice.reducer,
    style: styleSlice.reducer,
    support: supportSlice.reducer,
    user: userSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // TODO: Create middleware to handle Dates
    }),
});

export type AppDispatch = typeof store.dispatch;

export type AppState = ReturnType<typeof store.getState>;
