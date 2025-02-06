import { useParams } from "react-router-dom";
import { useUnmount } from "usehooks-ts";
import { useSoundPreloader } from "@client/hooks/sounds/useSoundPreloader";
import { usePresence } from "#app/hooks/sockets/usePresence";
import { useSocketListener } from "#app/hooks/sockets/useSocketListener";
import { CaseBattles } from "#app/services/case-battles";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";

export const BattleManager = () => {
  const params = useParams<{ battleId: string }>();
  const dispatch = useAppDispatch();
  const battleId = params.battleId!;

  useSoundPreloader(
    "spin-land",
    "spin-tick",
    "confetti-jackpot",
    "confetti-win",
    "count-short",
    "count-long",
    "special",
  );

  usePresence({
    joinKey: "case-battle-player-join",
    leaveKey: "case-battle-player-leave",
    roomKey: battleId,
  });

  useSocketListener("case-battle-player-init", (battle) => {
    dispatch(CaseBattles.initPlayer(battle));
  });

  useSocketListener("case-battle-player-stream", (update) => {
    dispatch(CaseBattles.updatePlayer(update));
  });

  useUnmount(() => {
    dispatch(CaseBattles.resetPlayer());
  });

  return null;
};
