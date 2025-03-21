import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Games } from "#app/services/games";
import { Site } from "#app/services/site";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export function useAppGames() {
  
  const dispatch = useAppDispatch();

  const {data} = useQuery({
    queryKey: ["games"],
    queryFn: () =>
      Games.getGames({category: "all"}),
  });

  useEffect(() => {
    if (data) {
      dispatch(Site.initGames(data?.games || []));
    }
  }, [data]);
  return null;
}
