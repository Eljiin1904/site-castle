import { PageLoading } from "@client/comps/page/PageLoading";
import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BattleHeader } from "./BattleHeader";
import { BattleLogs } from "./BattleLogs";
import { BattlePlayers } from "./BattlePlayers";
import { BattleView } from "./BattleView";
import { BattleRounds } from "./BattleRounds";
import { BattleFairness } from "./BattleFairness";

export const BattleContent = () => {
  const initialized = useAppSelector((x) => x.battlePlayer.initialized);

  if (!initialized) {
    return <PageLoading />;
  } else {
    return (
      <Div
        fx
        column
        gap={20}
      >
        <BattleHeader />
        <Div
          fx
          column
          gap={16}
        >
          <BattleRounds />
          <BattleView />
          <Div
            fx
            column
            border
          >
            <BattlePlayers />
            <BattleLogs />
          </Div>
        </Div>
        <BattleFairness />
      </Div>
    );
  }
};
