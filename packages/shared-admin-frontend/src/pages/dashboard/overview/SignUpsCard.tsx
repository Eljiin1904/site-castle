import { SiteReport } from "@core/types/site/SiteReport";
import { SvgTeam } from "@client/svgs/common/SvgTeam";
import { OverviewCard } from "./OverviewCard";
import { OverviewSlide } from "./OverviewSlide";

export const SignUpsCard = ({ report }: { report: SiteReport }) => {
  const users = report.users;

  return (
    <OverviewCard
      icon={SvgTeam}
      heading="User Acquisition"
    >
      <OverviewSlide
        label="Total Users"
        value={users.totalUsers.toLocaleString()}
      />
      <OverviewSlide
        label="New Users"
        value={users.newUsers.toLocaleString()}
      />
      <OverviewSlide
        label="Organic Referrals"
        value={users.organicReferrals.toLocaleString()}
      />
      <OverviewSlide
        label="Sponsored Referrals"
        value={users.sponsoredReferrals.toLocaleString()}
      />
      <OverviewSlide
        label="Internal Campaign Referrals"
        value={users.promotionReferrals.toLocaleString()}
      />
      <OverviewSlide
        label="Organic Sign Ups"
        value={users.organicUsers.toLocaleString()}
      />
    </OverviewCard>
  );
};
