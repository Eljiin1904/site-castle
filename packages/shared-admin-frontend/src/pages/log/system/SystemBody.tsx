import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { Div } from "@client/comps/div/Div";
import { SystemLogKind } from "@core/types/system/SystemLogKind";
import { System } from "#app/services/system";
import { SystemHeader } from "./SystemHeader";
import { SystemTable } from "./SystemTable";
import { SystemFooter } from "./SystemFooter";

export const SystemBody = () => {
  const limit = 15;
  const [kind, setKind] = useState<SystemLogKind>();
  const [minDate, setMinDate] = useState<Date | undefined>(
    subDays(Date.now(), 7),
  );
  const [maxDate, setMaxDate] = useState<Date>();
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [kind, minDate, maxDate]);

  const query = useQuery({
    queryKey: ["system-log", kind, minDate, maxDate, limit, page],
    queryFn: () => System.getLog({ kind, minDate, maxDate, limit, page }),
    placeholderData: (prev) => prev,
  });

  const log = query.data?.log || [];

  return (
    <Div
      fx
      column
    >
      <SystemHeader
        kind={kind}
        minDate={minDate}
        maxDate={maxDate}
        isLoading={query.isLoading}
        setKind={setKind}
        setMinDate={setMinDate}
        setMaxDate={setMaxDate}
        onRefreshClick={() => (page === 1 ? query.refetch() : setPage(1))}
      />
      <SystemTable
        log={log}
        isLoading={query.isLoading}
      />
      <SystemFooter
        page={page}
        hasNext={log.length !== 0 && log.length % limit === 0}
        setPage={setPage}
      />
    </Div>
  );
};
