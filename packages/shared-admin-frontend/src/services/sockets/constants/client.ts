import { Socket, io } from "socket.io-client";
import { Dates } from "@core/services/dates";
import { AdminClientEvents } from "@core/types/sockets/AdminClientEvents";
import { AdminServerEvents } from "@core/types/sockets/AdminServerEvents";
import config from "#app/config";

export const client: Socket<AdminServerEvents, AdminClientEvents> = io(
  config.apiURL,
  {
    transports: ["websocket"],
  },
);

client.onAny((event, ...args) => {
  for (const arg of args) {
    if (typeof arg === "object") {
      Dates.parseDates(arg);
    }
  }
});
