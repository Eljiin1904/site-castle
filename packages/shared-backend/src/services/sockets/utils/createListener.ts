import { SiteClientEvents } from "@core/types/sockets/SiteClientEvents";
import { HandledError } from "@server/services/errors";
import { SiteSocket } from "#app/types/sockets/SiteSocket";
import { SiteServer } from "#app/types/sockets/SiteServer";
import { Sockets } from "@server/services/sockets";

type ListenerOptions<K extends keyof SiteClientEvents> = {
  action: "init" | "connection" | "event";
} & (
  | {
      action: "init";
      callback: (io: SiteServer) => Promise<void>;
    }
  | {
      action: "connection";
      callback: (io: SiteServer, socket: SiteSocket) => Promise<void>;
    }
  | {
      action: "event";
      key: K;
      secure: boolean;
      callback: (
        io: SiteServer,
        socket: SiteSocket,
        ...args: Parameters<SiteClientEvents[K]>
      ) => Promise<void>;
    }
);

export function createListener<K extends keyof SiteClientEvents>(options: ListenerOptions<K>) {
  return (io: SiteServer) => {
    if (options.action === "init") {
      options.callback(io).catch((e) => Sockets.handleError(e));
    } else {
      io.on("connection", (socket) => {
        if (options.action === "connection") {
          options.callback(io, socket).catch((e) => Sockets.handleError(e, socket.data.ip));
        } else if (options.action === "event") {
          socket.on<keyof SiteClientEvents>(options.key, (...args: any) => {
            if (options.secure && !socket.data.isAuthenticated) {
              Sockets.handleError(new HandledError("Not authenticated."), socket.data.ip);
            } else {
              options
                .callback(io, socket, ...(args as Parameters<SiteClientEvents[K]>))
                .catch((e) => Sockets.handleError(e, socket.data.ip));
            }
          });
        }
      });
    }
  };
}
