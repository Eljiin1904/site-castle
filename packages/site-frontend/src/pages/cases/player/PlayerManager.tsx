import { ChestDocument } from "@core/types/chests/ChestDocument";
import { ChestPlayer } from "#app/comps/chest-player/ChestPlayer";
import { useOpen } from "./useOpen";

export const PlayerManager = ({ chest }: { chest: ChestDocument }) => {
  const handleOpen = useOpen(chest);

  return (
    <ChestPlayer
      chest={chest}
      backTo="/cases"
      fairnessTo="/fairness/cases/game"
      onOpen={handleOpen}
    />
  );
};
