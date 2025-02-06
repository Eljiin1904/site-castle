import { Fragment } from "react";
import { AffiliateLeader } from "@core/types/affiliates/AffiliateLeader";
import { PageTitle } from "@client/comps/page/PageTitle";
import { SvgTrophy } from "@client/svgs/common/SvgTrophy";
import { LeaderCardGrid } from "./LeaderCardGrid";

export const LeaderSection = ({
  leaders,
}: {
  leaders: AffiliateLeader[] | undefined;
}) => {
  return (
    <Fragment>
      <PageTitle
        icon={SvgTrophy}
        heading="Top Affiliates"
      />
      <LeaderCardGrid leaders={leaders} />
    </Fragment>
  );
};
