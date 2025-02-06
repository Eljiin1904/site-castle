import { Fragment } from "react";
import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LeaderCard, LeaderCardHeader } from "./LeaderCard";
import { RaceHeader } from "./RaceHeader";

export const RaceBody = () => {
  const userId = useAppSelector((x) => x.user._id);
  const race = useAppSelector((x) => x.holiday.race);

  return (
    <Fragment>
      <RaceHeader />
      <Div
        fx
        column
        gap={8}
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
    </Fragment>
  );
};
