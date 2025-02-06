import { useEffect } from "react";
import { SiteClientEvents } from "@core/types/sockets/SiteClientEvents";
import { Sockets } from "#app/services/sockets";
import config from "#app/config";
import { useAppSelector } from "../store/useAppSelector";

type UsePresenceOptions = {
  joinKey: keyof SiteClientEvents;
  leaveKey: keyof SiteClientEvents;
  roomKey?: string | number;
  secure?: boolean;
};

export function usePresence({ joinKey, leaveKey, roomKey, secure }: UsePresenceOptions) {
  const connected = useAppSelector((x) => x.socket.connected);
  const authenticated = useAppSelector((x) => x.user.authenticated);

  useEffect(() => {
    if (!connected) {
      return;
    }
    if (secure && !authenticated) {
      return;
    }

    const handleJoin = () => {
      if (roomKey) {
        Sockets.client.emit(joinKey, roomKey);
      } else {
        Sockets.client.emit(joinKey);
      }
    };

    const handleLeave = () => {
      if (roomKey) {
        Sockets.client.emit(leaveKey, roomKey);
      } else {
        Sockets.client.emit(leaveKey);
      }
    };

    if (config.env === "development" || config.env === "devcloud") {
      // Hack for StrictMode double rendering causing race conditions in socket emits
      setTimeout(handleJoin);
    } else {
      handleJoin();
    }

    return () => {
      handleLeave();
    };
  }, [connected, authenticated, joinKey, leaveKey, roomKey, secure]);
}
