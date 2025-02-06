import { useEffect } from "react";
import { Sockets } from "#app/services/sockets";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export function useAppSocket() {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const dispatch = useAppDispatch();

  const onConnected = () => {
    dispatch(Sockets.setConnected(true));
  };

  const onDisconnected = () => {
    dispatch(Sockets.setConnected(false));
  };

  useEffect(() => {
    Sockets.client.on("connect", onConnected);
    Sockets.client.on("disconnect", onDisconnected);
    return () => {
      Sockets.client.off("connect", onConnected);
      Sockets.client.off("disconnect", onDisconnected);
    };
  });

  useEffect(() => {
    if (Sockets.client.connected) {
      Sockets.client.disconnect().connect();
    }
  }, [authenticated]);

  return null;
}
