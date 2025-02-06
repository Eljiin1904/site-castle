import { Strings } from "@core/services/strings";
import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BoostDates } from "#app/services/rewards/Rewards";
import { Rewards } from "#app/services/rewards";
import { BoostCard } from "./BoostCard";
import { RewardBoostTimeframe } from "@core/types/rewards/RewardBoostTimeframe";

export const BoostGrid = ({
  dates,
  onClaimClick,
}: {
  dates: BoostDates | undefined;
  onClaimClick: (x: RewardBoostTimeframe) => void;
}) => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";

  return (
    <Div
      gap={16}
      flow={small ? "row-wrap" : undefined}
    >
      {Rewards.boostTimeframes.map((x) => (
        <BoostCard
          key={x}
          image={`/graphics/rewards-boost-${x}`}
          heading={`${Strings.capitalize(x)} Boost`}
          startDate={dates ? dates[x].startDate : undefined}
          endDate={dates ? dates[x].endDate : undefined}
          onClaimClick={() => onClaimClick(x)}
        />
      ))}
    </Div>
  );
};
