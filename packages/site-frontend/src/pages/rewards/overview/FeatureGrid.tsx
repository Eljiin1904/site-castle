import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { FeatureCard } from "./FeatureCard";

export const FeatureGrid = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";

  return (
    <Div
      gap={16}
      flow={small ? "row-wrap" : undefined}
    >
      <FeatureCard
        image="/graphics/rewards-overview-boosts"
        heading="Boosts"
        description="Claim Your Balance Boost Now!"
        to="/rewards/boosts"
      />
      <FeatureCard
        image="/graphics/rewards-overview-gems"
        heading="Gem Store"
        description="Spend Gems on Amazing Rewards and Perks!"
        to="/rewards/gems"
      />
      <FeatureCard
        image="/graphics/rewards-overview-cases"
        heading="Level Up Cases"
        description="Reached a new level? Open your free cases!"
        to="/rewards/level-cases"
      />
    </Div>
  );
};
