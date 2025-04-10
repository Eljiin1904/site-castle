import { SiteSearch } from "#app/comps/site-search/SiteSearch";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { ButtonGroup } from "@client/comps/button/ButtonGroup";
import { Div } from "@client/comps/div/Div";
import { Game } from "@core/services/game";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Site } from "#app/services/site";
import { GameKindType } from "@core/services/game/Game";

export const GameSearch = ({home = false}: {
  home?: boolean;
}) => {
  
  const currentFilter = useAppSelector((x) => x.site.filter);
  const dispatch = useAppDispatch();
  const small = useIsMobileLayout();
  const {t} = useTranslation(["home"]);

  const gameOptions = [t('games.all'), ...Game.kinds.map((x) => t(`games.${x}`, {count: 2}))];
  const gameValues: GameKindType[] = ['all', ...Game.kinds];
  
  const value = gameValues.indexOf(currentFilter || 'all');
  
  return (
    <Div
      fx
      column
      gap={24}
      flexGrow
      position="static"
    >
      <SiteSearch />
      {home && <ButtonGroup
          options={gameOptions}
          size={small ? "sm" : "md"}
          gap={small ? 12 : 16}
          value={value}  
          setValue={(x) => dispatch(Site.setFilter(gameValues[x]))}
      />}
    </Div>
  );
};