import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { UserDocument } from "@core/types/users/UserDocument";
import { Div } from "@client/comps/div/Div";
import { Affiliates } from "#app/services/affiliates";
import { ReferralsHeader } from "./ReferralsHeader";
import { ReferralTable } from "./ReferralTable";
import { ReferralsFooter } from "./ReferralsFooter";

export const ReferralsBody = ({ user }: { user: UserDocument }) => {
  const affiliateId = user._id;
  const limit = 15;
  const [timeIndex, setTimeIndex] = useState(3);
  const [sortIndex, setSortIndex] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [timeIndex, sortIndex]);

  const query = useQuery({
    queryKey: ["referrals", affiliateId, timeIndex, sortIndex, limit, page],
    queryFn: () =>
      Affiliates.getReferrals({
        affiliateId,
        timeIndex,
        sortIndex,
        limit,
        page,
      }),
    placeholderData: (prev) => prev,
  });

  const referrals = query.data?.referrals || [];

  return (
    <Div
      fx
      column
    >
      <ReferralsHeader
        timeIndex={timeIndex}
        sortIndex={sortIndex}
        isLoading={query.isLoading}
        setTimeIndex={setTimeIndex}
        setSortIndex={setSortIndex}
        onRefreshClick={() => (page === 1 ? query.refetch() : setPage(1))}
      />
      <ReferralTable
        referrals={referrals}
        isLoading={query.isLoading}
      />
      <ReferralsFooter
        page={page}
        hasNext={referrals.length !== 0 && referrals.length % limit === 0}
        setPage={setPage}
      />
    </Div>
  );
};
