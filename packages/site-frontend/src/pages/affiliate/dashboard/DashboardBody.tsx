import { Fragment, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Intimal } from "@core/services/intimal";
import { PageNotice } from "@client/comps/page/PageNotice";
import { Errors } from "@client/services/errors";
import { usePost } from "@client/hooks/system/usePost";
import { Toasts } from "@client/services/toasts";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Affiliates } from "#app/services/affiliates";
import { DashboardBanner } from "./DashboardBanner";
import { StatCards } from "./StatCards";
import { TierSection } from "./TierSection";
import { LeaderSection } from "./LeaderSection";

export const DashboardBody = () => {
  const [loading, setLoading] = useState(false);
  const authenticated = useAppSelector((x) => x.user.authenticated);

  const query = useQuery({
    enabled: authenticated,
    queryKey: ["fairness-seeds"],
    queryFn: () => Affiliates.getDashboard(),
  });

  const handleClaim = usePost(async () => {
    const { amount } = await Affiliates.claimCommission();
    Toasts.success(`Claimed ${Intimal.toLocaleString(amount)} in commission.`);
  }, setLoading);

  if (query.error) {
    return (
      <PageNotice
        image="/graphics/notice-chicken-error"
        title="Error"
        message="Something went wrong, please refetch page."
        buttonLabel="Refetch Page"
        description={Errors.getMessage(query.error)}
        onButtonClick={query.refetch}
      />
    );
  }

  return (
    <Fragment>
      <DashboardBanner />
      <StatCards
        loading={loading}
        onClaimClick={handleClaim}
      />
      <TierSection />
      <LeaderSection leaders={query.data?.leaders} />
    </Fragment>
  );
};
