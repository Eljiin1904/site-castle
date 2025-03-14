import { Fragment, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Catalog } from "@client/comps/catalog/Catalog";
import { PageTitle } from "@client/comps/page/PageTitle";
import { SitePage } from "#app/comps/site-page/SitePage";
import { Cases } from "#app/services/cases";
import { IndexHeader } from "./index/IndexHeader";
import { CaseCard, IndexCardPlaceholder } from "./index/IndexCard";
import { PageBanner } from "#app/comps/site-page/PageBanner";
import { Div } from "@client/comps/div/Div";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";

export const CaseIndexPage = () => {
  const limit = 30;
  const [searchText, setSearchText] = useState<string>();
  const [priceIndex, setPriceIndex] = useLocalStorage("case-index-price", 0);
  const [sortIndex, setSortIndex] = useLocalStorage("case-index-sort", 0);
  const small = useIsMobileLayout();

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
    <PageBanner image="/graphics/cases-header" heading={"Cases"} description="" content={<></>}/>  
    <SitePage
      className="CaseIndexPage"
      title="Cases"
      gap={small ? 20: 24}
    >
      <PageTitle
        heading="Explore Our cases"
        />
      <Div fx column gap={small ? 20: 40}>
        <IndexHeader
          searchText={searchText}
          priceIndex={priceIndex}
          sortIndex={sortIndex}
          setSearchText={setSearchText}
          setPriceIndex={setPriceIndex}
          setSortIndex={setSortIndex}
        />
        <Catalog
          pages={query.data?.pages?.map((x) => x.chests)}
          pageSize={limit}
          isFetching={query.isFetching}
          emptyMessage="No cases found."
          hasNextPage={query.hasNextPage}
          fetchNextPage={query.fetchNextPage}
          placeholderRenderer={(key) => <IndexCardPlaceholder key={key} />}
          gap={small ? 20: 24}
          itemRenderer={(x, i) => (
            <CaseCard
              key={x._id}
              chest={x}
            />
          )}
        />
      </Div>
    </SitePage>
    </Fragment>
  );
};
