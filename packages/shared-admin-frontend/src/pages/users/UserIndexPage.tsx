import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Div } from "@client/comps/div/Div";
import { SitePage } from "#app/comps/site-page/SitePage";
import { Users } from "#app/services/users";
import { UserTable } from "./index/UserTable";
import { UsersHeader } from "./index/UsersHeader";
import { UsersFooter } from "./index/UsersFooter";

export const UserIndexPage = () => {
  const limit = 15;
  const [searchText, setSearchText] = useState<string>();
  const [searchIndex, setSearchIndex] = useState(0);
  const [sortIndex, setSortIndex] = useState(1);
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [searchText, searchIndex, sortIndex]);

  const query = useQuery({
    queryKey: ["users", searchText, searchIndex, sortIndex, limit, page],
    queryFn: () =>
      Users.getUsers({ searchText, searchIndex, sortIndex, limit, page }),
    placeholderData: (prev) => prev,
  });

  const users = query.data?.users || [];

  return (
    <SitePage
      className="UserIndexPage"
      title="Users"
    >
      <UsersHeader
        searchText={searchText}
        searchIndex={searchIndex}
        sortIndex={sortIndex}
        isLoading={query.isFetching}
        setSearchText={setSearchText}
        setSearchIndex={setSearchIndex}
        setSortIndex={setSortIndex}
        onRefreshClick={() => (page === 1 ? query.refetch() : setPage(1))}
      />
      <Div
        fx
        column
      >
        <UserTable
          users={users}
          isLoading={query.isLoading}
        />
        <UsersFooter
          page={page}
          hasNext={users.length !== 0 && users.length % limit === 0}
          setPage={setPage}
        />
      </Div>
    </SitePage>
  );
};
