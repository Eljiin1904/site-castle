import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { Div } from "@client/comps/div/Div";
import { AdminLogKind } from "@core/types/admin/AdminLogKind";
import { Admin } from "#app/services/admin";
import { AdminHeader } from "./AdminHeader";
import { AdminTable } from "./AdminTable";
import { AdminFooter } from "./AdminFooter";

export const AdminBody = () => {
  const limit = 15;
  const [kind, setKind] = useState<AdminLogKind>();
  const [minDate, setMinDate] = useState<Date | undefined>(
    subDays(Date.now(), 7),
  );
  const [maxDate, setMaxDate] = useState<Date>();
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [kind, minDate, maxDate]);

  const query = useQuery({
    queryKey: ["admin-log", kind, minDate, maxDate, limit, page],
    queryFn: () => Admin.getLog({ kind, minDate, maxDate, limit, page }),
    placeholderData: (prev) => prev,
  });

  const log = query.data?.log || [];

  return (
    <Div
      fx
      column
    >
      <AdminHeader
        kind={kind}
        minDate={minDate}
        maxDate={maxDate}
        isLoading={query.isLoading}
        setKind={setKind}
        setMinDate={setMinDate}
        setMaxDate={setMaxDate}
        onRefreshClick={() => (page === 1 ? query.refetch() : setPage(1))}
      />
      <AdminTable
        log={log}
        isLoading={query.isLoading}
      />
      <AdminFooter
        page={page}
        hasNext={log.length !== 0 && log.length % limit === 0}
        setPage={setPage}
      />
    </Div>
  );
};
