import { AdminClientEvents } from "@core/types/sockets/AdminClientEvents";
import { HandledError } from "@server/services/errors";
import { Sockets } from "@server/services/sockets";
import { AdminSocket } from "#app/types/sockets/AdminSocket";
import { AdminServer } from "#app/types/sockets/AdminServer";

type ListenerOptions<K extends keyof AdminClientEvents> = {
  action: "init" | "connection" | "event";
} & (
  | {
      action: "init";
      callback: (io: AdminServer) => Promise<void>;
    }
  | {
      action: "connection";
      callback: (io: AdminServer, socket: AdminSocket) => Promise<void>;
    }
  | {
      action: "event";
      key: K;
      secure: boolean;
      callback: (
        io: AdminServer,
        socket: AdminSocket,
        ...args: Parameters<AdminClientEvents[K]>
      ) => Promise<void>;
    }
);

export function createListener<K extends keyof AdminClientEvents>(
  options: ListenerOptions<K>,
) {
  return (io: AdminServer) => {
    if (options.action === "init") {
      options.callback(io).catch((e) => Sockets.handleError(e));
    } else {
      io.on("connection", (socket) => {
        if (options.action === "connection") {
          options
            .callback(io, socket)
            .catch((e) => Sockets.handleError(e, socket.data.ip));
        } else if (options.action === "event") {
          socket.on<keyof AdminClientEvents>(options.key, (...args: any) => {
            if (options.secure && !socket.data.isAuthenticated) {
              Sockets.handleError(
                new HandledError("Not authenticated."),
                socket.data.ip,
              );
            } else {
              options
                .callback(
                  io,
                  socket,
                  ...(args as Parameters<AdminClientEvents[K]>),
                )
                .catch((e) => Sockets.handleError(e, socket.data.ip));
            }
          });
        }
      });
    }
  };
}
