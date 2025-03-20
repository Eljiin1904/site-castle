import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Games } from "#app/services/games";
import { Site } from "#app/services/site";
import { useQuery } from "@tanstack/react-query";

export function useAppGames() {
  const dispatch = useAppDispatch();

  const {data} = useQuery({
    queryKey: ["games"],
    queryFn: () =>
      Games.getGames({category: "all"}),
  });

  dispatch(Site.initGames(data?.games || []));
  return null;
}
