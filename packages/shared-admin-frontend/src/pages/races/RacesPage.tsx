import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dialogs } from "@client/services/dialogs";
import { Div } from "@client/comps/div/Div";
import { RaceCreateModal } from "#app/modals/rewards/RaceCreateModal";
import { SitePage } from "#app/comps/site-page/SitePage";
import { Rewards } from "#app/services/rewards";
import { RacesHeader } from "./RacesHeader";
import { RaceTable } from "./RaceTable";
import { RacesFooter } from "./RacesFooter";

export const RacesPage = () => {
  const limit = 15;
  const [searchText, setSearchText] = useState<string>();
  const [searchIndex, setSearchIndex] = useState(0);
  const [sortIndex, setSortIndex] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [searchText, sortIndex]);

  const query = useQuery({
    queryKey: ["races", searchText, searchIndex, sortIndex, limit, page],
    queryFn: () =>
      Rewards.getRaces({ searchText, searchIndex, sortIndex, limit, page }),
    placeholderData: (prev) => prev,
  });

  const races = query.data?.races || [];

  return (
    <SitePage
      className="RacesPage"
      title="Races"
    >
      <RacesHeader
        searchText={searchText}
        searchIndex={searchIndex}
        sortIndex={sortIndex}
        isLoading={query.isFetching}
        setSearchText={setSearchText}
        setSearchIndex={setSearchIndex}
        setSortIndex={setSortIndex}
        onRefreshClick={() => (page === 1 ? query.refetch() : setPage(1))}
        onCreateClick={() =>
          Dialogs.open("primary", <RaceCreateModal onSuccess={query.refetch} />)
        }
      />
      <Div
        fx
        column
      >
        <RaceTable
          races={races}
          isLoading={query.isLoading}
        />
        <RacesFooter
          page={page}
          hasNext={races.length !== 0 && races.length % limit === 0}
          setPage={setPage}
        />
      </Div>
    </SitePage>
  );
};
