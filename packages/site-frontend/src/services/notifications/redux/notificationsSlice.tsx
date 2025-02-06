import { createSlice } from "@reduxjs/toolkit";
import { NotificationDocument } from "@core/types/notifications/NotificationDocument";
import { StreamUpdate } from "@core/types/database/DatabaseStreamEvent";
import { Database } from "@core/services/database";

interface NotificationsState {
  open: boolean;
  log: NotificationDocument[];
}

const initialState: NotificationsState = {
  open: false,
  log: [],
};

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: ({ reducer }) => ({
    setOpen: reducer<boolean>((state, { payload }) => {
      state.open = payload;
    }),
    setLog: reducer<NotificationDocument[]>((state, { payload }) => {
      state.log = payload;
    }),
    addNotification: reducer<NotificationDocument>((state, { payload }) => {
      const log = state.log.slice();

      log.unshift(payload);

      state.log = log;
    }),
    updateLog: reducer<StreamUpdate>((state, { payload }) => {
      const update = payload;
      const notification = state.log.find((x) => x._id === update.documentId);

      if (notification) {
        Database.updateDocument({
          document: notification,
          updatedFields: update.updatedFields,
          removedFields: update.removedFields,
        });
      }
    }),
    removeNotification: reducer<string>((state, { payload }) => {
      const notificationId = payload;
      const log = state.log.slice();
      const index = log.findIndex((x) => x._id === notificationId);

      if (index !== -1) {
        log.splice(index, 1);
      }

      state.log = log;
    }),
  }),
});

export const { setOpen, setLog, addNotification, updateLog, removeNotification } =
  notificationsSlice.actions;
