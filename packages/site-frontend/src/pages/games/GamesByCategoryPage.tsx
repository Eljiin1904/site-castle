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
import { TableFooterPagination } from "#app/comps/pagination/TableFooterPagination";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Site } from "#app/services/site";


export const GamesByCategoryPage = ({category}: {
  category: ExternalGameCategory;
}) => {
  
  const small = useIsMobileLayout();
  const {t} = useTranslation(['games']);
 
  return (<Fragment>
    <PageBanner image={`/graphics/${category}-games-tile`} heading={t(`games:${category}`)} description="" content={<></>}/> 
    <SitePage
      className="GamesPage"
      gap={small ? 32: 56}
      pb={small ? 32: 56}
    >
      <GamesByCategory category={category} />
    </SitePage>
  </Fragment>
  );
};

export const GamesByCategory = ({category, filterOff}: {category: ExternalGameCategory | undefined, filterOff?: boolean}) => {
  
  const [sortIndex, setSortIndex] = useState<number>(0);
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const {t} = useTranslation(['games']); 
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const small = useIsMobileLayout();
  const limit = 40;

  const query = useQuery({
    queryKey: ["games-results",category, sortIndex, selectedProviders, page],
    queryFn: () => HubEight.getGameList({ category, products: selectedProviders, page,limit, sortIndex}),
    placeholderData: (prev) => prev,
  });

  useEffect(() => {
    // Reset sort and providers when category changes
    setSortIndex(0);
    setSelectedProviders([]);
    dispatch(Site.setSearch(''));
  }, [category]);

  const games = query.data?.games || [];
  const total = query.data?.total || 0;

  return (<Fragment>
      {!filterOff &&<Div fx justifyContent="space-between" alignItems="center" gap={small ? 16: 24} column={small}>
        <GameSearch />
        <Div fx={small} gap={small ? 16: 24}>
          <GameProvider selectedProviders={selectedProviders} setSelectedProviders={setSelectedProviders} category={category} />
          <GameSort sortBy={sortIndex} setSortBy={setSortIndex} />
        </Div>
      </Div>}
      
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
  </Fragment>
  );
}