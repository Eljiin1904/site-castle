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
import { TableFooterPagination } from "#app/comps/pagination/TableFooterPagination";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Site } from "#app/services/site";


export const GamesByCategoryPage = ({category}: {
  category: ExternalGameCategory;
}) => {
  
  const dispatch = useAppDispatch();
  const [sortBy, setSortBy] = useState<GameSortType>("featured");
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]); 
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(40); 
  const small = useIsMobileLayout();
  const {t} = useTranslation(['games']);

  useEffect(() => {
    // Reset sort and providers when category changes
    setSortBy("featured");
    setSelectedProviders([]);
    dispatch(Site.setSearch(''));
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
    queryKey: ["games-results",category, sortBy, selectedProviders, page],
    queryFn: () => HubEight.getGameList({ category, products: selectedProviders, page,limit, sortIndex}),
    placeholderData: (prev) => prev,
  });

  const games = query.data?.games || [];
  const total = query.data?.total || 0;
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
    <TableFooterPagination 
      page={page} 
      total={total} 
      limit={limit} 
      inPage={games.length}
      setPage={setPage}
      hasNext={games.length !== 0 && games.length % limit === 0}
      label={t("game",{count: query.data?.total || 0})}
      />
    </SitePage>
  </Fragment>
  );
};