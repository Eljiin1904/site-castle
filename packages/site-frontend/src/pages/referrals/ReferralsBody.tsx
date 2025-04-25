import { Div } from "@client/comps/div/Div";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { ReferralsStats } from "./ReferralsStats";
import { DefaultReferral } from "./DefaultReferral";
import { Campaigns } from "./Campaigns";
import { ReferralsHistory } from "./ReferralsHistory";

export const ReferralsBody = () => {
  
  const small = useIsMobileLayout();
  return (
    <Div
      fx
      column
      gap={40}
      mt={small ? 20 : 0}
    >
      <ReferralsStats />
      <DefaultReferral />
      <Campaigns />
      <ReferralsHistory />
    </Div>
  );
};
