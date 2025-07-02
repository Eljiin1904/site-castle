import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Div } from "@client/comps/div/Div";
import { HubEightGameDocument } from "@core/types/hub-eight/HubEightGameDocument";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Span } from "@client/comps/span/Span";
import { GameHubEight } from "./GameHubEight";

export const GamesGrid = ({games}: {
  games: HubEightGameDocument[];
}) => {

  const layout = useAppSelector((x) => x.style.mainLayout);
  const {t} = useTranslation(["games"]);
  return (<Div
      wrap
      gap={layout === 'mobile' ? 20 : 24}
      fx
    >
      {games.length === 0 ? <Div fx justifyContent="center" alignItems="center" style={{width: '100%'}}>
        <Span>{t('notGames')}</Span>
      </Div> :
      games.map((x, i) => <GameHubEight key={`${x._id}-${i}`}
      image={x.url_background ?? undefined}
      heading={x.name} 
      to={`/games/${x.game_code}`}
      subheading={x.product}
      />)}
    </Div>
  );
};