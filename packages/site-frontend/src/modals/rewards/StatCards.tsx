import { Div } from "@client/comps/div/Div";
import { SvgChest } from "@client/svgs/common/SvgChest";
import { SvgCrown } from "@client/svgs/common/SvgCrown";
import { SvgGem } from "@client/svgs/common/SvgGem";
import { SvgFast } from "@client/svgs/common/SvgFast";
import { SvgCertificate } from "@client/svgs/common/SvgCertificate";
import { SvgCard } from "@client/svgs/common/SvgCard";
import { SvgRain } from "@client/svgs/common/SvgRain";
import { SvgFlag } from "@client/svgs/common/SvgFlag";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { StatSlide } from "./StatSlide";

export const StatCards = () => {
  const stats = useAppSelector((x) => x.user.stats);
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";

  return (
    <Div
      fx
      wrap={small}
      gap={1}
      bg="brown-5"
      overflow="auto"
    >
      <Div
        column
        fx
        gap={1}
      >
        <StatSlide
          label="Daily Boosts"
          icon={SvgFast}
          tokens={stats.boostDailyAmount || 0}
        />
        <StatSlide
          label="Weekly Boosts"
          icon={SvgFast}
          tokens={stats.boostWeeklyAmount || 0}
        />
        <StatSlide
          label="Monthly Boosts"
          icon={SvgFast}
          tokens={stats.boostMonthlyAmount || 0}
        />
        <StatSlide
          label="Level Cases"
          icon={SvgChest}
          tokens={stats.levelCaseAmount || 0}
        />
        <StatSlide
          label="Gem Store"
          icon={SvgGem}
          tokens={stats.gemStoreAmount || 0}
        />
      </Div>
      <Div
        column
        fx
        gap={1}
      >
        <StatSlide
          label="Races"
          icon={SvgFlag}
          tokens={stats.raceAmount || 0}
        />
        <StatSlide
          label="Rains"
          icon={SvgRain}
          tokens={stats.rainAmount || 0}
        />
        <StatSlide
          label="Promo Codes"
          icon={SvgCertificate}
          tokens={stats.promotionCodeAmount || 0}
        />
        <StatSlide
          label="Giveaway Cards"
          icon={SvgCard}
          tokens={stats.promotionCardAmount || 0}
        />
        <StatSlide
          label="VIP Rewards"
          icon={SvgCrown}
          tokens={stats.rewardCreditAmount || 0}
        />
      </Div>
    </Div>
  );
};
