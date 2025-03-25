import { Fragment, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Catalog } from "@client/comps/catalog/Catalog";
import { PageTitle } from "@client/comps/page/PageTitle";
import { SitePage } from "#app/comps/site-page/SitePage";
import { Cases } from "#app/services/cases";
import { PageBanner } from "#app/comps/site-page/PageBanner";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Div } from "@client/comps/div/Div";
import { ButtonGroup } from "@client/comps/button/ButtonGroup";
import { BetBoard } from "#app/comps/bet-board/BetBoard";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const BetsPage = () => {
  const limit = 30;
  const [searchText, setSearchText] = useState<string>();
  const [priceIndex, setPriceIndex] = useLocalStorage("case-index-price", 0);
  const [sortIndex, setSortIndex] = useLocalStorage("case-index-sort", 0);
  const small = useIsMobileLayout();
  const {t} = useTranslation();

  const query = useInfiniteQuery({
    queryKey: ["cases", searchText, priceIndex, sortIndex, limit],
    queryFn: ({ pageParam: page }) =>
      Cases.getCases({ searchText, priceIndex, sortIndex, limit, page }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage?.chests.length < limit ? undefined : pages.length + 1,
    placeholderData: (prev) => prev,
  });

  return (<Fragment>
    <PageBanner image="/graphics/bets-tile" heading={"Bets"} description="" content={<></>}/>  
    <SitePage
      className="CaseIndexPage"
      title="Bets"
      gap={small ? 20: 24}
    >
      <Div fx column gap={small ? 20: 40}>
      <BetBoard title={t("bets.recentBets")}/>
      </Div>
    </SitePage>
    </Fragment>
  );
};
