import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BattleViewSeats } from "./BattleViewSeats";
import { BattleViewResults } from "./BattleViewResults";
import { BattleViewCountdown } from "./BattleViewCountdown";
import { BattleViewReels } from "./BattleViewReels";

export const BattleView = () => {
  const status = useAppSelector((x) => x.battlePlayer.status);

  if (status === "completed") {
    return <BattleViewResults />;
  } else if (status === "simulating") {
    return <BattleViewReels />;
  } else if (status === "pending") {
    return <BattleViewCountdown />;
  } else {
    return <BattleViewSeats />;
  }
};
