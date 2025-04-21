import { Div } from "@client/comps/div/Div";
import { Card } from "@client/comps/cards/Card";
import { CardSection } from "@client/comps/cards/CardSection";
import { Heading } from "@client/comps/heading/Heading";
import { SvgBattle } from "@client/svgs/common/SvgBattle";
import { SvgDice } from "@client/svgs/common/SvgDice";
import { SvgRain } from "@client/svgs/common/SvgRain";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { StatCardSection } from "./StatCardSection";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { SvgDuel } from "@client/svgs/common/SvgDuel";
import { SvgCrash } from "@client/svgs/common/SvgCrash";
import { SvgLimbo } from "@client/svgs/common/SvgLimbo";
import { SvgBlackjack } from "@client/svgs/common/SvgBlackjack";
import { SvgMines } from "@client/svgs/common/SvgMines";
import { SvgDouble } from "#app/svgs/double/SvgDouble";
import { SvgBets } from "#app/svgs/common/SvgBets";
import { SvgNet } from "#app/svgs/common/SvgNet";
import { SvgBoost } from "#app/svgs/common/SvgBoosts";
import { SvgVIP } from "#app/svgs/common/SvgVIP";
import { SvgCases } from "@client/svgs/common/SvgCases";
import { PageTitle } from "@client/comps/page/PageTitle";

export const StatCardGrid = () => {
  const stats = useAppSelector((x) => x.user.stats);
  const {t} = useTranslation(["account"]);
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile" || layout === "tablet";
  return (
    <Div
      fx
      column
      gap={small ? 16: 24}
    >
      <PageTitle heading={t('stats.allStats')} />
      <Div
        fx
        gap={24}
        wrap={small}
      >
        <Card column>
          <CardSection position="header">
            <Heading  
              as="h3"
              size={16}
              fontWeight="regular"
              textTransform="uppercase">
                {t("menu.bet", {count: 2})}
            </Heading>
          </CardSection>
          <StatCardSection
            label={t("games:duel")}
            icon={SvgDuel}
            count={stats.duelBetCount || 0}
          />
          <StatCardSection
           label={t("games:case_battles")}
            icon={SvgBattle}
            count={stats.caseBattleBetCount || 0}
          />
          <StatCardSection
            label={t("games:crash")}
            icon={SvgCrash}
            count={stats.crashBetCount || 0}
          />
          <StatCardSection
            label={t("games:dice")}
            icon={SvgDice}
            count={stats.diceBetCount || 0}
          />
          <StatCardSection
            label={t("games:limbo")}
            icon={SvgLimbo}
            count={stats.limboBetCount || 0}
          />
           <StatCardSection
            label={t("games:blackjack")}
            icon={SvgBlackjack}
            count={stats.blackjackBetCount || 0}
          />
          <StatCardSection
            label={t("games:mines")}
            icon={SvgMines}
            count={stats.minesBetCount || 0}
          />
          <StatCardSection
            label={t("games:double")}
            icon={SvgDouble}
            count={stats.doubleBetCount || 0}
          />          
           <StatCardSection
            label={t("games:cases")}
            icon={SvgCases}
            count={stats.caseBetCount || 0}
          />
          <StatCardSection
            label={t("stats.totalBets")}
            icon={SvgBets}
            count={stats.betCount || 0}
            borderBottom={false}
          />
        </Card>
        <Card column>
          <CardSection position="header">
            <Heading  
              as="h3"
              size={16}
              fontWeight="regular"
              textTransform="uppercase">
                {t("stats.wagered")}
            </Heading>
          </CardSection>
          <StatCardSection
            label={t("games:duel")}
            icon={SvgDuel}
            tokens={stats.duelWagerAmount || 0}
          />
          <StatCardSection
           label={t("games:case_battles")}
            icon={SvgBattle}
            tokens={stats.caseBattleWagerAmount || 0}
          />
          <StatCardSection
            label={t("games:crash")}
            icon={SvgCrash}
            tokens={stats.crashWagerAmount || 0}
          />
          <StatCardSection
            label={t("games:dice")}
            icon={SvgDice}
            tokens={stats.diceWagerAmount || 0}
          />
          <StatCardSection
             label={t("games:limbo")}
            icon={SvgLimbo}
            tokens={stats.limboWagerAmount || 0}
          />
           <StatCardSection
            label={t("games:blackjack")}
            icon={SvgBlackjack}
            tokens={stats.blackjackWagerAmount || 0}
          />
          <StatCardSection
            label={t("games:mines")}
            icon={SvgMines}
            tokens={stats.minesWagerAmount || 0}
          />
          <StatCardSection
            label={t("games:cases")}
            icon={SvgCases}
            tokens={stats.caseWagerAmount || 0}
          />
          <StatCardSection
           label={t("games:double")}
            icon={SvgDouble}
            tokens={stats.doubleWagerAmount || 0}
          />
          <StatCardSection
            label={t("stats.totalWagered")}
            icon={SvgBets}
            tokens={stats.wagerAmount || 0}
            borderBottom={false}
          />
        </Card>
        <Card column>
          <CardSection position="header">
          <Heading  
              as="h3"
              size={16}
              fontWeight="regular"
              textTransform="uppercase">
                {t("stats.economy")}
            </Heading>
          </CardSection>
          <StatCardSection
            label={t("stats.tipsSent")}
            icon={SvgBets}
            tokens={stats.tipSentAmount || 0}
          />
          <StatCardSection
            label={t("stats.tipsReceived")}
            icon={SvgBets}
            tokens={stats.tipReceiveAmount || 0}
          />
          <StatCardSection
            label={t("stats.netTips")}
            icon={SvgNet}
            tokens={(stats.tipReceiveAmount || 0) - (stats.tipSentAmount || 0)}
          />
          <StatCardSection
            label={t("stats.rainRecieved")}
            icon={SvgRain}
            tokens={stats.rainAmount || 0}
          />
          <StatCardSection
            label={t("stats.boostsReceived")}
            icon={SvgBoost}
            tokens={
              (stats.boostDailyAmount || 0) +
              (stats.boostWeeklyAmount || 0) +
              (stats.boostMonthlyAmount || 0)
            }
          />
          <StatCardSection
            label={t("stats.totalRewards")}
            icon={SvgVIP}
            tokens={stats.rewardAmount || 0}
            borderBottom={false}
          />
        </Card>
      </Div>
    </Div>
  );
};
