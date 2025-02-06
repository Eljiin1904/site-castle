import { useEffect } from "react";
import { usePresence } from "#app/hooks/sockets/usePresence";
import { useSocketListener } from "#app/hooks/sockets/useSocketListener";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Site } from "#app/services/site";

export const ActivityManager = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(Site.initActivity(undefined));
  }, []);

  usePresence({
    joinKey: "activity-feed-join",
    leaveKey: "activity-feed-leave",
  });

  useSocketListener("activity-feed-init", (x) => {
    dispatch(Site.initActivity(x));
  });

  useSocketListener("activity-feed-insert", (x) => {
    dispatch(Site.updateActivity(x));
  });

  return null;
};
