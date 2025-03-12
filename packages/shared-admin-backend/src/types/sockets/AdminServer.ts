import type { Server } from "socket.io";
import type { AdminClientEvents } from "@core/types/sockets/AdminClientEvents";
import type { AdminServerEvents } from "@core/types/sockets/AdminServerEvents";
import type { SocketData } from "./SocketData";

export type AdminServer = Server<
  AdminClientEvents,
  AdminServerEvents,
  {},
  SocketData
>;
