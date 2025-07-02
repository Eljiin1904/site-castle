import { GamesSlider } from "#app/comps/games/GamesSlider";
import { HubEight } from "#app/services/hubEight";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useQuery } from "@tanstack/react-query"

/**
 * Temporal component to show recommended games. Right now it fetches a list of 10 slot games from HubEight.
 * This is a placeholder and should be replaced with a more robust recommendation system in the future.
 * @returns 
 */
export const RecommendedGames = () => {

  const {t} = useTranslation(["games"]);
  const query = useQuery({
    queryKey: ["recommended-games"],
    queryFn: () => HubEight.getGameList({category: 'slot', limit: 10}),
    placeholderData: (prev) => prev,
  });

  const games = query.data?.games || [];

  if(games.length === 0) 
    return null;

  const items = games?.map((x) => {
      return {
        image: x.url_thumb,
        heading: x.name,
        subheading: "",
        to: `/games/${x.game_code}`,
      };
    });
  
    return (
      <GamesSlider
        title={t("recommended")}
        items={items}
        type="hub-eight"
      />
    );
}