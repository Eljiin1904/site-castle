import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { Dates } from "@core/services/dates";
import { Div } from "@client/comps/div/Div";
import { SitePage } from "#app/comps/site-page/SitePage";
import { Chests } from "#app/services/chests";
import { ChestTable } from "./index/ChestTable";
import { ChestsHeader } from "./index/ChestsHeader";
import { ChestsFooter } from "./index/ChestsFooter";

export const ChestIndexPage = () => {
  const limit = 15;
  const [searchText, setSearchText] = useState<string>();
  const [timeIndex, setTimeIndex] = useState(2);
  const [minDate, setMinDate] = useState<Date | undefined>(
    subDays(Date.now(), 30),
  );
  const [maxDate, setMaxDate] = useState<Date>();
  const [kindIndex, setKindIndex] = useState(0);
  const [sortIndex, setSortIndex] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(
    () => setPage(1),
    [searchText, timeIndex, minDate, maxDate, kindIndex, sortIndex],
  );

  const query = useQuery({
    queryKey: [
      "chests",
      searchText,
      timeIndex,
      minDate,
      maxDate,
      kindIndex,
      sortIndex,
      limit,
      page,
    ],
    queryFn: () =>
      Chests.getReports({
        searchText,
        sortIndex,
        limit,
        page,
        kind: Chests.kinds[kindIndex],
        ...Dates.getMinMaxFromIndex({ timeIndex, minDate, maxDate }),
      }),
    placeholderData: (prev) => prev,
  });

  const chests = query.data?.chests || [];

  return (
    <SitePage
      className="ChestIndexPage"
      title="Chests"
    >
      <ChestsHeader
        searchText={searchText}
        timeIndex={timeIndex}
        minDate={minDate}
        maxDate={maxDate}
        kindIndex={kindIndex}
        sortIndex={sortIndex}
        isLoading={query.isFetching}
        setSearchText={setSearchText}
        setTimeIndex={setTimeIndex}
        setMinDate={setMinDate}
        setMaxDate={setMaxDate}
        setKindIndex={setKindIndex}
        setSortIndex={setSortIndex}
        onRefreshClick={() => (page === 1 ? query.refetch() : setPage(1))}
      />
      <Div
        fx
        column
      >
        <ChestTable
          chests={chests}
          isLoading={query.isLoading}
        />
        <ChestsFooter
          page={page}
          hasNext={chests.length !== 0 && chests.length % limit === 0}
          setPage={setPage}
        />
      </Div>
    </SitePage>
  );
};
