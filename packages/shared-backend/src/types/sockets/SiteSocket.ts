import type { Socket } from "socket.io";
import type { SiteClientEvents } from "@core/types/sockets/SiteClientEvents";
import type { SiteServerEvents } from "@core/types/sockets/SiteServerEvents";
import type { SocketData } from "./SocketData";

export type SiteSocket = Socket<
  SiteClientEvents,
  SiteServerEvents,
  {},
  SocketData
>;
