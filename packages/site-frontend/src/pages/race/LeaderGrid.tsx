import { RaceState } from "@core/types/rewards/RaceState";
import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { RaceHeader } from "./RaceHeader";
import { RaceTable } from "./RaceTable";

export const LeaderGrid = ({ race }: { race: RaceState }) => {
  const userId = useAppSelector((x) => x.user._id);

  let leaders = [...race.leaders];
  if(race.local && !race.leaders.find((x) => x.user.id === userId)) 
  leaders.push(race.local);

  if(!leaders.length) 
    return null;
  return (
    <Div
      fx
      column
      gap={32}
    >
      
      <RaceHeader />
      <Div fx column gap={16}>
        <RaceTable leaders={leaders}/>
      </Div>
    </Div>
  );
};
