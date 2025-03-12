import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { UserDocument } from "@core/types/users/UserDocument";
import { UserActionKind } from "@core/types/users/UserActionKind";
import { Div } from "@client/comps/div/Div";
import { Users } from "#app/services/users";
import { ActionsHeader } from "./ActionsHeader";
import { ActionsTable } from "./ActionsTable";
import { ActionsFooter } from "./ActionsFooter";

export const ActionsBody = ({ user }: { user: UserDocument }) => {
  const userId = user._id;
  const limit = 12;
  const [kind, setKind] = useState<UserActionKind>();
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [kind]);

  const query = useQuery({
    queryKey: ["user-actions", userId, kind, limit, page],
    queryFn: () => Users.getActions({ userId, kind, limit, page }),
    placeholderData: (prev) => prev,
  });

  const actions = query.data?.actions || [];

  return (
    <Div
      fx
      column
    >
      <ActionsHeader
        kind={kind}
        isLoading={query.isLoading}
        setKind={setKind}
        onRefreshClick={() => (page === 1 ? query.refetch() : setPage(1))}
      />
      <ActionsTable
        actions={actions}
        isLoading={query.isLoading}
      />
      <ActionsFooter
        page={page}
        hasNext={actions.length !== 0 && actions.length % limit === 0}
        setPage={setPage}
      />
    </Div>
  );
};
