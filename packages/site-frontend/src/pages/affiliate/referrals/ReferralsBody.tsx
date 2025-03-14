import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageNotice } from "@client/comps/page/PageNotice";
import { Errors } from "@client/services/errors";
import { Div } from "@client/comps/div/Div";
import { Affiliates } from "#app/services/affiliates";
import { ReferralsHeader } from "./ReferralsHeader";
import { ReferralsTable } from "./ReferralsTable";
import { ReferralsFooter } from "./ReferralsFooter";
import { StatGrid } from "./StatGrid";
import { ReferralHeaderHistory } from "./ReferralHistoryHeader";
import { PageTitle } from "@client/comps/page/PageTitle";
import { Heading } from "@client/comps/heading/Heading";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";

export const ReferralsBody = () => {
  const limit = 10;
  const [timeIndex, setTimeIndex] = useState(3);
  const [sortIndex, setSortIndex] = useState(0);
  const [page, setPage] = useState(1);
  const small = useIsMobileLayout();

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

  return (
    <Div
      fx
      column
      gap={small ? 24: 40}
    >
      <PageTitle
        heading="Your Referrals"
        mt={small ? 32 : 36}
      />
      {/* <ReferralsHeader
        timeIndex={timeIndex}
        sortIndex={sortIndex}
        isLoading={statsQ.isLoading || referralsQ.isLoading}
        setTimeIndex={setTimeIndex}
        setSortIndex={setSortIndex}
        onRefreshClick={() => {
          statsQ.refetch();
          page === 1 ? referralsQ.refetch() : setPage(1);
        }}
      /> */}
      <StatGrid stats={stats} />
      <Div
        fx
        column
        gap={40}
      >
        <Heading
          as="h2"
          size={24}
          mt={16}
          fontWeight="regular"
          textTransform="uppercase"
        >
          Referral History
        </Heading>
        <ReferralsTable
          referrals={referrals}
          isLoading={referralsQ.isLoading}
        />
        {/* <ReferralsFooter
          page={page}
          hasNext={referrals.length !== 0 && referrals.length % limit === 0}
          setPage={setPage}
        /> */}
      </Div>
    </Div>
  );
};
