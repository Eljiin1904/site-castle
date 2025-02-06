import { RaceState } from "@core/types/rewards/RaceState";
import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LeaderCard, LeaderCardHeader } from "./LeaderCard";

export const LeaderGrid = ({ race }: { race: RaceState }) => {
  const userId = useAppSelector((x) => x.user._id);

  return (
    <Div
      fx
      column
      gap={12}
    >
      <LeaderCardHeader />
      {race.leaders.map((leader) => (
        <LeaderCard
          key={leader.user.id}
          leader={leader}
          local={leader.user.id === userId}
        />
      ))}
      {race.local && !race.leaders.find((x) => x.user.id === userId) && (
        <LeaderCard
          leader={race.local}
          local
        />
      )}
    </Div>
  );
};
