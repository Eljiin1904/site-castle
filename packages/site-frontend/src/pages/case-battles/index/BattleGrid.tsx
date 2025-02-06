import { useMemo } from "react";
import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BattleCard, BattleCardPlaceholder } from "./BattleCard";
import { useJoin } from "./useJoin";

export const BattleGrid = () => {
  const initialized = useAppSelector((x) => x.battleIndex.initialized);
  const limit = useAppSelector((x) => x.battleIndex.limit);
  const battles = useAppSelector((x) => x.battleIndex.battles);

  const handleJoin = useJoin();

  const CardsMemo = useMemo(
    () =>
      battles.map((battle, i) => (
        <BattleCard
          key={battle._id}
          index={i}
          battle={battle}
          onJoinClick={(seat) => handleJoin(battle, seat)}
        />
      )),
    [battles],
  );

  return (
    <Div
      className="BattleGrid"
      fx
      column
      gap={12}
    >
      {!initialized &&
        [...Array(limit)].map((x, i) => <BattleCardPlaceholder key={i} />)}
      {CardsMemo}
    </Div>
  );
};
