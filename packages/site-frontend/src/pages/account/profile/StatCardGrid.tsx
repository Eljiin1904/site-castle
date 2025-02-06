import { Div } from "@client/comps/div/Div";
import { Card } from "@client/comps/cards/Card";
import { CardSection } from "@client/comps/cards/CardSection";
import { Heading } from "@client/comps/heading/Heading";
import { SvgCoin } from "@client/svgs/common/SvgCoin";
import { SvgCoinStack } from "@client/svgs/common/SvgCoinStack";
import { SvgChest } from "@client/svgs/common/SvgChest";
import { SvgBattle } from "@client/svgs/common/SvgBattle";
import { SvgSlide } from "@client/svgs/common/SvgSlide";
import { SvgMedal } from "@client/svgs/common/SvgMedal";
import { SvgDice } from "@client/svgs/common/SvgDice";
import { SvgRain } from "@client/svgs/common/SvgRain";
import { SvgMultiplier } from "@client/svgs/common/SvgMultiplier";
import { SvgFast } from "@client/svgs/common/SvgFast";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { StatCardSection } from "./StatCardSection";

export const StatCardGrid = () => {
  const stats = useAppSelector((x) => x.user.stats);
  const mainLayout = useAppSelector((x) => x.style.mainLayout);

  return (
    <Div
      fx
      column
      gap={16}
    >
      <Div
        fx
        gap={16}
        wrap={mainLayout === "mobile"}
      >
        <Card column>
          <CardSection position="header">
            <Heading>{"Bets"}</Heading>
          </CardSection>
          <StatCardSection
            label="Cases"
            icon={SvgChest}
            count={stats.caseBetCount || 0}
          />
          <StatCardSection
            label="Battles"
            icon={SvgBattle}
            count={stats.caseBattleBetCount || 0}
          />
          <StatCardSection
            label="Double"
            icon={SvgSlide}
            count={stats.doubleBetCount || 0}
          />
          <StatCardSection
            label="Dice"
            icon={SvgDice}
            count={stats.diceBetCount || 0}
          />
          <StatCardSection
            label="Limbo"
            icon={SvgMultiplier}
            count={stats.limboBetCount || 0}
          />
          <StatCardSection
            label="Total Bets"
            icon={SvgCoin}
            count={stats.betCount || 0}
          />
        </Card>
        <Card column>
          <CardSection position="header">
            <Heading>{"Wagered"}</Heading>
          </CardSection>
          <StatCardSection
            label="Cases"
            icon={SvgChest}
            tokens={stats.caseWagerAmount || 0}
          />
          <StatCardSection
            label="Battles"
            icon={SvgBattle}
            tokens={stats.caseBattleWagerAmount || 0}
          />
          <StatCardSection
            label="Double"
            icon={SvgSlide}
            tokens={stats.doubleWagerAmount || 0}
          />
          <StatCardSection
            label="Dice"
            icon={SvgDice}
            tokens={stats.diceWagerAmount || 0}
          />
          <StatCardSection
            label="Limbo"
            icon={SvgMultiplier}
            tokens={stats.limboWagerAmount || 0}
          />
          <StatCardSection
            label="Total Wagered"
            icon={SvgCoin}
            tokens={stats.wagerAmount || 0}
          />
        </Card>
        <Card column>
          <CardSection position="header">
            <Heading>{"Economy"}</Heading>
          </CardSection>
          <StatCardSection
            label="Tips Sent"
            icon={SvgCoinStack}
            tokens={stats.tipSentAmount || 0}
          />
          <StatCardSection
            label="Tips Received"
            icon={SvgCoinStack}
            tokens={stats.tipReceiveAmount || 0}
          />
          <StatCardSection
            label="Net Tips"
            icon={SvgCoin}
            tokens={(stats.tipReceiveAmount || 0) - (stats.tipSentAmount || 0)}
          />
          <StatCardSection
            label="Rain Received"
            icon={SvgRain}
            tokens={stats.rainAmount || 0}
          />
          <StatCardSection
            label="Boosts Received"
            icon={SvgFast}
            tokens={
              (stats.boostDailyAmount || 0) +
              (stats.boostWeeklyAmount || 0) +
              (stats.boostMonthlyAmount || 0)
            }
          />
          <StatCardSection
            label="Total Rewards"
            icon={SvgMedal}
            tokens={stats.rewardAmount || 0}
          />
        </Card>
      </Div>
    </Div>
  );
};
