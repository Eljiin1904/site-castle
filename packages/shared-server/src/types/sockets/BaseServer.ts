import type { Server } from "socket.io";
import type { SocketData } from "./SocketData";

export type BaseServer = Server<{}, {}, {}, SocketData>;
