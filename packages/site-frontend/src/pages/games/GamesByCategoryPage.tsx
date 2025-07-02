import { Fragment, useEffect, useState } from "react";
import { SitePage } from "#app/comps/site-page/SitePage";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { PageBanner } from "#app/comps/site-page/PageBanner";
import { GameSearch } from "#app/comps/games/GamesSearch";
import { Div } from "@client/comps/div/Div";
import { GameSort } from "#app/comps/games/GameSort";
import { GameProvider } from "#app/comps/games/GameProvider";
import { useQuery } from "@tanstack/react-query";
import { HubEight } from "#app/services/hubEight";
import { ExternalGameCategory } from "@core/types/hub-eight/GameInformation";
import { GamesGrid } from "./GamesGrid";
import { GameSortType } from "@core/services/game/Game";


export const GamesByCategoryPage = ({category}: {
  category: ExternalGameCategory;
}) => {
  
  const [sortBy, setSortBy] = useState<GameSortType>("featured");
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);  
  const small = useIsMobileLayout();
  const {t} = useTranslation();

  useEffect(() => {
    // Reset sort and providers when category changes
    setSortBy("featured");
    setSelectedProviders([]);
  }, [category]);

  let sortIndex = 0;
  switch (sortBy) {
    case "featured":
      sortIndex = 0;
      break;
    case "popular":
      sortIndex = 1;
      break;
    case "az":
      sortIndex = 2;
      break;
    default:
      sortIndex = 3;
      break;
  }
  const query = useQuery({
    queryKey: ["games-results",category, sortBy, selectedProviders],
    queryFn: () => HubEight.getGameList({ category, products: selectedProviders, sortIndex}),
    placeholderData: (prev) => prev,
  });

  const games = query.data?.games || [];

  return (<Fragment>
    <PageBanner image={`/graphics/${category}-games-tile`} heading={t(`games:${category}`)} description="" content={<></>}/> 
    <SitePage
      className="GamesPage"
      gap={small ? 32: 56}
      pb={small ? 32: 56}
    >
    <Div fx justifyContent="space-between" alignItems="center" gap={small ? 16: 24} column={small}>
      <GameSearch />
      <GameProvider selectedProviders={selectedProviders} setSelectedProviders={setSelectedProviders} category={category} />
      <GameSort sortBy={sortBy} setSortBy={setSortBy} />
    </Div>
    <GamesGrid games={games}/>
    </SitePage>
  </Fragment>
  );
};