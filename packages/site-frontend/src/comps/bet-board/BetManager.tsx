import { useEffect } from "react";
import { SiteBetScope } from "@core/types/site/SiteBetScope";
import { usePresence } from "#app/hooks/sockets/usePresence";
import { useSocketListener } from "#app/hooks/sockets/useSocketListener";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Site } from "#app/services/site";

export const BetManager = ({ scope }: { scope: SiteBetScope }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(Site.initBets(undefined));
  }, [scope]);

  usePresence({
    joinKey: "bet-feed-join",
    leaveKey: "bet-feed-leave",
    roomKey: scope,
  });

  useSocketListener("bet-feed-init", (x) => {
    dispatch(Site.initBets(x));
  });

  useSocketListener("bet-feed-insert", (x) => {
    dispatch(Site.updateBets(x));
  });

  return null;
};
