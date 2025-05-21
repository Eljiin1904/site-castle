import { Socket, io } from "socket.io-client";
import { Dates } from "@core/services/dates";
import { SiteClientEvents } from "@core/types/sockets/SiteClientEvents";
import { SiteServerEvents } from "@core/types/sockets/SiteServerEvents";
import config from "#app/config";

// Ensure the URL has a protocol (https:// or http://)
// Socket.io treats URLs without a protocol as relative paths
let socketUrl = config.apiURL;
if (socketUrl && !socketUrl.startsWith('http://') && !socketUrl.startsWith('https://')) {
  socketUrl = `https://${socketUrl}`;
  console.log(`[Socket] Added https:// protocol to apiURL: ${socketUrl}`);
}

console.log(`[Socket] Connecting to: ${socketUrl}`);

export const client: Socket<SiteServerEvents, SiteClientEvents> = io(
  socketUrl,
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
