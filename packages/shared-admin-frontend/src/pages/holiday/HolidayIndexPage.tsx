import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Div } from "@client/comps/div/Div";
import { SitePage } from "#app/comps/site-page/SitePage";
import { Rewards } from "#app/services/rewards";
import { HolidayTable } from "./index/HolidayTable";
import { HolidayHeader } from "./index/HolidayHeader";
import { HolidayFooter } from "./index/HolidayFooter";

export const HolidayIndexPage = () => {
  const limit = 15;
  const [searchText, setSearchText] = useState<string>();
  const [sortIndex, setSortIndex] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [searchText, sortIndex]);

  const query = useQuery({
    queryKey: ["holidays", searchText, sortIndex, limit, page],
    queryFn: () =>
      Rewards.getHolidays({
        searchText,
        sortIndex,
        limit,
        page,
      }),
    placeholderData: (prev) => prev,
  });

  const holidays = query.data?.holidays || [];

  return (
    <SitePage
      className="HolidayIndexPage"
      title="Holidays"
    >
      <HolidayHeader
        searchText={searchText}
        sortIndex={sortIndex}
        isLoading={query.isFetching}
        setSearchText={setSearchText}
        setSortIndex={setSortIndex}
        onRefreshClick={() => (page === 1 ? query.refetch() : setPage(1))}
      />
      <Div
        fx
        column
      >
        <HolidayTable
          holidays={holidays}
          isLoading={query.isLoading}
        />
        <HolidayFooter
          page={page}
          hasNext={holidays.length !== 0 && holidays.length % limit === 0}
          setPage={setPage}
        />
      </Div>
    </SitePage>
  );
};
