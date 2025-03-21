import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useUnmount } from "usehooks-ts";
import { Site } from "#app/services/site";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { usePresence } from "#app/hooks/sockets/usePresence";
import { useSocketListener } from "#app/hooks/sockets/useSocketListener";

export const HashManager = () => {
  
  const dispatch = useAppDispatch();
  const { hash } = useLocation();

  useEffect(() => {
    const id = `home-${hash.replace("#", "")}`;
    const element = document.getElementById(id);
    element?.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }, [hash]);

  useUnmount(() => {
    dispatch(Site.setFilter('all'));
    dispatch(Site.setSearch(''));
  });

  usePresence({
    joinKey: "hot-feed-join",
    leaveKey: "hot-feed-leave",
    roomKey: "all",
  });
  
  useSocketListener("hot-feed-init", (games) => {
    
    dispatch(Site.updateHotGames(games));
    console.log("hot-feed-init", games);
  });

  useSocketListener("hot-feed-update", (games) => {
    console.log("hot-feed-update", games);
    dispatch(Site.updateHotGames(games));    
  });

  return null;
};
