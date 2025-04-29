import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Div } from "@client/comps/div/Div";
import { HistoryTable } from "./history/HistoryTable";
import { useState } from "react";
import { HistoryHeader } from "./history/HistoryHeader";
import { HistoryFooter } from "./history/HistoryFooter";
import { useQuery } from "@tanstack/react-query";
import { Affiliates } from "#app/services/affiliates";
import { UserCampaigns } from "@core/types/users/UserCampaigns";

export const ReferralsHistory = ({campaigns}: {
  campaigns: UserCampaigns[]
}) => {

  const [limit, setLimit] = useState(10);
  const [campaignId, setCampaignId] = useState<string>(campaigns.find(x => x.default)?.campaignId ?? '');
  const [page, setPage] = useState(1);
  const small = useIsMobileLayout();

  const referralsQ = useQuery({
    queryKey: ["campaign", campaignId, limit, page],
    queryFn: () =>
      Affiliates.getCampaignReferrals({ limit, page, campaignId, sortIndex: 1, timeIndex: 2 }),
    placeholderData: (prev) => prev,
  });

  const referrals = referralsQ.data?.referrals || [];
  const total = referralsQ.data?.total || 0;

  return (<Div fx column gap={40}>
    <HistoryHeader limit={limit} setLimit={setLimit} campaigns={campaigns} campaignId={campaignId} setCampaignId={setCampaignId} />
    <Div fx gap={small ? 16: 24} column center>
      <HistoryTable referrals={referrals} isLoading={referralsQ.isFetching} />
      <HistoryFooter 
        page={page}
        hasNext={referrals.length !== 0 && referrals.length % limit === 0}
        setPage={setPage}
        limit={limit}
        total={total}
        inPage={referrals.length}
      />
    </Div>
  </Div>);
};