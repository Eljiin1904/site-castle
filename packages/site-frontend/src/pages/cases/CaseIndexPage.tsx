import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Catalog } from "@client/comps/catalog/Catalog";
import { PageTitle } from "@client/comps/page/PageTitle";
import { SvgChest } from "@client/svgs/common/SvgChest";
import { SitePage } from "#app/comps/site-page/SitePage";
import { Cases } from "#app/services/cases";
import { IndexHeader } from "./index/IndexHeader";
import { CaseCard, IndexCardPlaceholder } from "./index/IndexCard";

export const CaseIndexPage = () => {
  const limit = 30;
  const [searchText, setSearchText] = useState<string>();
  const [priceIndex, setPriceIndex] = useLocalStorage("case-index-price", 0);
  const [sortIndex, setSortIndex] = useLocalStorage("case-index-sort", 0);

  const query = useInfiniteQuery({
    queryKey: ["cases", searchText, priceIndex, sortIndex, limit],
    queryFn: ({ pageParam: page }) =>
      Cases.getCases({ searchText, priceIndex, sortIndex, limit, page }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage?.chests.length < limit ? undefined : pages.length + 1,
    placeholderData: (prev) => prev,
  });

  return (
    <SitePage
      className="CaseIndexPage"
      title="Cases"
    >
      <PageTitle
        icon={SvgChest}
        heading="Cases"
      />
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
        itemRenderer={(x) => (
          <CaseCard
            key={x._id}
            chest={x}
          />
        )}
      />
    </SitePage>
  );
};
