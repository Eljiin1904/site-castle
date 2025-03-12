import type { Socket } from "socket.io";
import type { SocketData } from "./SocketData";

export type BaseSocket = Socket<{}, {}, {}, SocketData>;
