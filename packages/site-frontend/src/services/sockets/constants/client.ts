import { Socket, io } from "socket.io-client";
import { Dates } from "@core/services/dates";
import { SiteClientEvents } from "@core/types/sockets/SiteClientEvents";
import { SiteServerEvents } from "@core/types/sockets/SiteServerEvents";
import config from "#app/config";

export const client: Socket<SiteServerEvents, SiteClientEvents> = io(config.apiURL, {
  transports: ["websocket"],
});

client.onAny((event, ...args) => {
  for (const arg of args) {
    if (typeof arg === "object") {
      Dates.parseDates(arg);
    }
  }
});
