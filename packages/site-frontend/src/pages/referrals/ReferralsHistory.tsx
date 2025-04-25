import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Div } from "@client/comps/div/Div";
import { HistoryTable } from "./history/HistoryTable";
import { useState } from "react";
import { HistoryHeader } from "./history/HistoryHeader";
import { HistoryFooter } from "./history/HistoryFooter";
import { useQuery } from "@tanstack/react-query";
import { Affiliates } from "#app/services/affiliates";

export const ReferralsHistory = () => {

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const small = useIsMobileLayout();


  const referralsQ = useQuery({
    queryKey: ["referrals", limit, page],
    queryFn: () =>
      Affiliates.getReferrals({sortIndex:1, timeIndex: 1, limit, page }),
    placeholderData: (prev) => prev,
  });


  const referrals = referralsQ.data?.referrals || [];

  return (<Div fx column gap={40}>
    <HistoryHeader limit={limit} setLimit={setLimit} />
    <Div fx gap={small ? 16: 24} column center>
      <HistoryTable referrals={referrals} isLoading={false} />
      <HistoryFooter 
        page={page}
        hasNext={referrals.length !== 0 && referrals.length % limit === 0}
        setPage={setPage}
        limit={limit}
        total={1000}
        inPage={referrals.length}
      />
    </Div>
  </Div>);
};