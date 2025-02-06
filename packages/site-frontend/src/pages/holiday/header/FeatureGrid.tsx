import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { FeatureCard } from "./FeatureCard";

export const FeatureGrid = () => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";

  return (
    <Div
      fx
      gap={small ? 4 : 8}
      p={small ? 4 : 8}
    >
      <FeatureCard
        image="/events/christmas/feature-store"
        heading="Snowball Store"
        description="Open Holiday Rewards"
        to="/holiday/store"
      />
      <FeatureCard
        image="/events/christmas/feature-calendar"
        heading="Advent Calendar"
        description="Win up to 10K Howl Daily"
        to="/holiday/advent"
      />
      <FeatureCard
        image="/events/christmas/feature-raffle"
        heading="20K Weekly Raffles"
        description="Spend snowballs to earn tickets"
        to="/holiday/raffles"
      />
      <FeatureCard
        image="/events/christmas/feature-race"
        heading="100K Holiday Race"
        description="Earn the most to claim your share"
        to="/holiday/races"
      />
    </Div>
  );
};
