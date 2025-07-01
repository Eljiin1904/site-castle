import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Div } from "@client/comps/div/Div";
import { HubEightGameDocument } from "@core/types/hub-eight/HubEightGameDocument";
import { GameHubEight } from "./GameHubEight";

export const GamesGrid = ({games}: {
  games: HubEightGameDocument[];
}) => {

  const layout = useAppSelector((x) => x.style.mainLayout);
  return (<Div
      className="SearchResults"
      gap={layout === 'mobile' ? 20 : 24}
      fx
    >
      {games.map((x, i) => <GameHubEight key={`${x._id}-${i}`}
      image={x.url_background ?? undefined}
      heading={x.name} 
      to={`/games/${x.game_code}`}
      subheading={x.product}
      />)}
    </Div>
  );
};