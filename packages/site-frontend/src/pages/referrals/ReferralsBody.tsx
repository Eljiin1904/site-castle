import { Div } from "@client/comps/div/Div";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { ReferralsStats } from "./ReferralsStats";
import { DefaultReferral } from "./DefaultReferral";
import { Campaigns } from "./Campaigns";
import { ReferralsHistory } from "./ReferralsHistory";
import { useQuery } from "@tanstack/react-query";
import { Affiliates } from "#app/services/affiliates";

/*
  * Referrals Main Component, contains the ReferralsStats, DefaultReferral, Campaigns and ReferralsHistory components
  * @returns 
  */
export const ReferralsBody = () => {
  
  const small = useIsMobileLayout();
  const campaignsQ = useQuery({
    queryKey: ["campaigns"],
    queryFn: () =>
      Affiliates.getCampaigns({ limit: 100, page:1 }),
    placeholderData: (prev) => prev,
  });

  const campaigns = campaignsQ.data?.campaigns || [];
  
  return (
    <Div
      fx
      column
      gap={40}
      mt={small ? 20 : 0}
    >
      <ReferralsStats />
      <DefaultReferral campaign={campaigns.find(x => x.default)} />
      <Campaigns campaigns={campaigns.filter(x => !x.default)} />
      <ReferralsHistory />
    </Div>
  );
};
