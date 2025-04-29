import { useState } from "react";
import { Affiliates } from "#app/services/affiliates";
import { useQuery } from "@tanstack/react-query";
import { PageNotice } from "@client/comps/page/PageNotice";
import { Errors } from "@client/services/errors";

export const useReferralsManager = () => {

  const limit = 10;
  const [timeIndex, setTimeIndex] = useState(3);
  const [sortIndex, setSortIndex] = useState(0);
  const [page, setPage] = useState(1);
  
  const statsQ = useQuery({
    queryKey: ["referral-stats", timeIndex],
    queryFn: () => Affiliates.getStats({ timeIndex }),
    placeholderData: (prev) => prev,
  });

  const referralsQ = useQuery({
    queryKey: ["referrals", timeIndex, sortIndex, limit, page],
    queryFn: () =>
      Affiliates.getReferrals({ timeIndex, sortIndex, limit, page }),
    placeholderData: (prev) => prev,
  });

  const stats = statsQ.data?.stats;
  const referrals = referralsQ.data?.referrals || [];

  if (statsQ.error) {
    return (
      <PageNotice
        image="/graphics/notice-chicken-error"
        title="Error"
        message="Something went wrong, please refetch stats."
        buttonLabel="Refetch Stats"
        description={Errors.getMessage(statsQ.error)}
        onButtonClick={statsQ.refetch}
      />
    );
  }

  if (referralsQ.error) {
    return (
      <PageNotice
        image="/graphics/notice-chicken-error"
        title="Error"
        message="Something went wrong, please refetch referrals."
        buttonLabel="Refetch Referrals"
        description={Errors.getMessage(referralsQ.error)}
        onButtonClick={referralsQ.refetch}
      />
    );
  }

  return [stats, referrals];
};