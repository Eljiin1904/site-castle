import { useMemo, useState } from "react";
import { ChestDocument } from "@core/types/chests/ChestDocument";
import { ChestRoll } from "@core/types/chests/ChestRoll";
import { ChestLayout } from "@core/types/chests/ChestLayout";
import { ChestSpeed } from "@core/types/chests/ChestSpeed";
import { ChestReel } from "./ChestReel";

type UseChestReelsOptions = {
  chest: ChestDocument;
  layout: ChestLayout;
  speed: ChestSpeed;
  openCount: number;
  volumePrefix: string;
};

export function useChestReels({
  chest,
  layout,
  openCount,
  speed,
  volumePrefix,
}: UseChestReelsOptions) {
  const [animating, setAnimating] = useState(false);
  const [spinId, setSpinId] = useState(0);
  const [rolls, setRolls] = useState<ChestRoll[]>([]);

  const spin = (rolls: ChestRoll[]) => {
    setAnimating(true);
    setSpinId((x) => x + 1);
    setRolls(rolls);
  };

  const Reels = useMemo(
    () =>
      Array(openCount)
        .fill(0)
        .map((_, i) => (
          <ChestReel
            key={`${i}_ ${openCount}`}
            index={i}
            chest={chest}
            layout={layout}
            speed={speed}
            rolls={rolls}
            spinId={spinId}
            volumePrefix={volumePrefix}
            setAnimating={setAnimating}
          />
        )),
    [openCount, chest, layout, speed, rolls, spinId, volumePrefix],
  );

  return { Reels, animating, spin };
}
