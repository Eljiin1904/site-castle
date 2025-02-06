import { Affiliates } from "@core/services/affiliates";
import { Intimal } from "@core/services/intimal";
import { Numbers } from "@core/services/numbers";
import { Card } from "@client/comps/cards/Card";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Img } from "@client/comps/img/Img";
import { ProgressBar } from "@client/comps/progress-bar/ProgressBar";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAffiliateTier } from "#app/hooks/affiliates/useAffiliateTier";

export const TierCards = () => {
  const { tier, tierProgress, tierGoal } = useAffiliateTier();
  const info = Affiliates.getTierInfo(tier);
  const nextTier = Math.min(tier + 1, Affiliates.tiers.length - 1);
  const nextInfo = Affiliates.getTierInfo(nextTier);
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";

  return (
    <Div
      gap={16}
      flow={small ? "row-wrap" : undefined}
    >
      <Card
        fx
        column
        center
        p={16}
        gap={16}
      >
        <Span>{"Current Tier"}</Span>
        <Div
          align="center"
          gap={8}
        >
          <Img
            type="png"
            path={`/affiliate-tiers/tier-${tier}`}
            width="32px"
          />
          <Span
            family="title"
            weight="bold"
            color="white"
            size={18}
          >
            {`Tier ${tier}`}
          </Span>
        </Div>
        <Div
          fx
          center
          p={10}
          bg="dark-green"
        >
          <Span
            weight="semi-bold"
            color="white"
          >
            {`${info.rate * 100}% Commission`}
          </Span>
        </Div>
      </Card>
      <Card
        fx
        column
        center
        p={16}
        gap={16}
      >
        <Span>{"Progress"}</Span>
        <Span
          py={2}
          family="title"
          weight="bold"
          color="white"
          size={18}
        >
          {Numbers.toPercentString(tierProgress / tierGoal)}
        </Span>
        <ProgressBar
          height={8}
          progress={tierProgress / tierGoal}
        />
        <Span>
          {`${Intimal.toLocaleString(tierProgress, 0)} / ${Intimal.toLocaleString(tierGoal, 0)} XP`}
        </Span>
      </Card>
      <Card
        fx
        column
        center
        p={16}
        gap={16}
      >
        <Span>{"Next Tier"}</Span>
        <Div
          align="center"
          gap={8}
        >
          <Img
            type="png"
            path={`/affiliate-tiers/tier-${nextTier}`}
            width="32px"
          />
          <Span
            family="title"
            weight="bold"
            color="white"
            size={18}
          >
            {`Tier ${nextTier}`}
          </Span>
        </Div>
        <Div
          fx
          center
          p={10}
          bg="dark-purple"
        >
          <Span
            weight="semi-bold"
            color="white"
          >
            {`${nextInfo.rate * 100}% Commission`}
          </Span>
        </Div>
      </Card>
    </Div>
  );
};
