import { useEffect } from "react";
import { Sockets } from "#app/services/sockets";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import config from "#app/config";

export function useAppSocket() {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const dispatch = useAppDispatch();

  // Log socket connection info on mount
  useEffect(() => {
    console.log("[Socket Connection] Current API URLs:", {
      configApiURL: config.apiURL,
      configSiteAPI: config.siteAPI,
      socketInstance: Sockets.client
    });
  }, []);

  const onConnected = () => {
    console.log("[Socket] Connected successfully");
    dispatch(Sockets.setConnected(true));
  };

  const onDisconnected = () => {
    console.log("[Socket] Disconnected");
    dispatch(Sockets.setConnected(false));
  };

  const onConnectError = (error: Error) => {
    console.error("[Socket] Connection error:", error);
  };

  useEffect(() => {
    Sockets.client.on("connect", onConnected);
    Sockets.client.on("disconnect", onDisconnected);
    Sockets.client.on("connect_error", onConnectError);
    
    return () => {
      Sockets.client.off("connect", onConnected);
      Sockets.client.off("disconnect", onDisconnected);
      Sockets.client.off("connect_error", onConnectError);
    };
  }, [dispatch]);

  useEffect(() => {
    if (Sockets.client.connected) {
      console.log("[Socket] User auth changed, reconnecting...");
      Sockets.client.disconnect().connect();
    }
  }, [authenticated]);

  return null;
}
