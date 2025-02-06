import { SiteStatsDocument } from "@core/types/site/SiteStatsDocument";
import { Div } from "@client/comps/div/Div";
import { StatSlide } from "./StatSlide";

export const StatCards = ({
  stats,
}: {
  stats: SiteStatsDocument | undefined;
}) => {
  return (
    <Div
      column
      fx
      gap={1}
      bg="brown-5"
      overflow="auto"
    >
      <StatSlide
        label="Sign Ups"
        tip="Number of users who have registered on Castle.com"
        count={stats?.newUsers || 0}
      />
      <StatSlide
        label="Active Users"
        tip="Number of logged in users who have engaged with Castle.com"
        count={stats?.activeUsers || 0}
      />
      <StatSlide
        label="Total Bets"
        tip="Cumulative number of bets placed by all users"
        count={stats?.betCount || 0}
      />
      <StatSlide
        label="Total Wagered"
        tip="Total value of all bets placed across Castle.com"
        tokens={stats?.betAmount || 0}
      />
      <StatSlide
        label="Total Rewarded"
        tip="Total amount paid out to users as part of our rewards program"
        tokens={stats?.rewardAmount || 0}
      />
      <StatSlide
        label="Affiliate Commission"
        tip="Earnings distributed to users through our affiliate program"
        tokens={stats?.commissionAmount || 0}
      />
      <StatSlide
        label="Biggest Win"
        tip="Largest amount won by a user in a single bet"
        tokens={stats?.biggestWin || 0}
      />
      <StatSlide
        label="Total Rain Payout"
        tip="Total amount distributed to users through the rain feature"
        tokens={stats?.rainAmount || 0}
      />
      <StatSlide
        label="Wallet Volume"
        tip="Total deposited and withdrawn by users"
        tokens={(stats?.depositAmount || 0) + (stats?.withdrawAmount || 0)}
      />
      <StatSlide
        label="Skin Volume"
        tip="Total value of skins deposited and withdrawn by users"
        tokens={
          (stats?.depositSkinAmount || 0) + (stats?.withdrawSkinAmount || 0)
        }
      />
    </Div>
  );
};
