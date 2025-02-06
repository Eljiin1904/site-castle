import { usePost } from "@client/hooks/system/usePost";
import { CaseBattles } from "#app/services/case-battles";
import { store } from "#app/store";

export function useAddBot() {
  const handleAddBot = usePost(async (isMounted, seat: number) => {
    const {
      battlePlayer: { _id: battleId },
    } = store.getState();

    await CaseBattles.addBot({ battleId, seat });
  });

  return handleAddBot;
}
