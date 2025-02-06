import { useUnmount } from "usehooks-ts";
import { usePresence } from "#app/hooks/sockets/usePresence";
import { CaseBattles } from "#app/services/case-battles";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useSocketListener } from "#app/hooks/sockets/useSocketListener";

export const IndexManager = () => {
  const limit = useAppSelector((x) => x.battleIndex.limit);
  const dispatch = useAppDispatch();

  usePresence({
    joinKey: "case-battle-index-join",
    leaveKey: "case-battle-index-leave",
    roomKey: limit,
  });

  useSocketListener("case-battle-index-init", (battles) => {
    dispatch(CaseBattles.initIndex(battles));
  });

  useSocketListener("case-battle-index-insert", (battle) => {
    dispatch(CaseBattles.insertIndex(battle));
  });

  useSocketListener("case-battle-index-update", (update) => {
    dispatch(CaseBattles.updateIndex(update));
  });

  useSocketListener("case-battle-index-stats", (count, value) => {
    dispatch(CaseBattles.setIndexStats({ count, value }));
  });

  useUnmount(() => {
    dispatch(CaseBattles.resetIndex());
  });

  return null;
};
