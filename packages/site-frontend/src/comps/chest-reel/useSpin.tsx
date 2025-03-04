import { useIsMounted } from "usehooks-ts";
import { ChestRoll } from "@core/types/chests/ChestRoll";
import { ChestDocument } from "@core/types/chests/ChestDocument";
import { ChestItem } from "@core/types/chests/ChestItem";
import { ChestSpeed } from "@core/types/chests/ChestSpeed";
import { Utility } from "@client/services/utility";
import { Chests } from "#app/services/chests";
import { Effects } from "#app/services/effects";
import { useAnimator } from "#app/hooks/animations/useAnimator";
import { useSoundPlayer } from "@client/hooks/sounds/useSoundPlayer";

type SpinOptions = {
  chest: ChestDocument;
  axis: "x" | "y";
  speed: ChestSpeed;
  roll: ChestRoll;
  rolls: ChestRoll[];
  itemSize: number;
  master: boolean;
  setAnimating: (x: boolean) => void;
  setItems: (x: ChestItem[]) => void;
  setJackpot: (x: boolean) => void;
  setPopout: (x: boolean) => void;
};

export const useSpin = (volumePrefix: string) => {
  const animator = useAnimator();
  const isMounted = useIsMounted();
  const playSound = useSoundPlayer(volumePrefix);

  const handleSpin = async ({
    chest,
    axis,
    speed,
    roll,
    rolls,
    itemSize,
    master,
    setAnimating,
    setItems,
    setJackpot,
    setPopout,
  }: SpinOptions) => {
    const { origin, end, result } = Chests.getReelPositions({ itemSize, roll });

    if (master) {
      setAnimating(true);
    }

    animator.set(axis, origin);

    setItems(Chests.createSpinReel({ chest, roll }));
    setJackpot(chest.items[roll.lootIndex].jackpot);
    setPopout(false);

    await Utility.wait(200);

    let lastTick = 0;
    let lastTickTime = 0;

    const tickTimes = [
      80, 80, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 80, 80, 80, 80, 80, 80, 80,
    ];

    await animator.play({
      axis,
      timing: "slide",
      duration: Chests.getSpinDuration(speed),
      startValue: origin,
      endValue: end,
      onUpdate: (offset) => {
        if (!master) return;

        const tick = Math.round(offset / itemSize);
        const minTime = tickTimes[0] || 100;

        if (tick !== lastTick && Date.now() - lastTickTime > minTime) {
          lastTick = tick;
          lastTickTime = Date.now();

          tickTimes.shift();
          playSound("spin-tick");
        }
      },
    });

    if (!isMounted()) {
      return;
    }

    await Utility.wait(200);

    await animator.play({
      axis,
      timing: "ease",
      duration: Chests.alignTime,
      startValue: end,
      endValue: result,
      onPlay: () => {
        if (!master) return;

        playSound("spin-land");
      },
    });

    setPopout(true);

    await Utility.wait(200);

    if (!isMounted()) {
      return;
    }

    if (roll.specialSpin) {
      if (master) {
        playSound("special");
      }

      await Utility.wait(Chests.resultTime);

      if (!isMounted()) {
        return;
      }

      animator.set(axis, origin);

      setItems(Chests.createSpecialReel({ chest, roll }));
      setPopout(false);

      await Utility.wait(200);

      if (!isMounted()) {
        return;
      }

      await animator.play({
        axis,
        timing: "slide",
        duration: Chests.getSpinDuration(speed),
        startValue: origin,
        endValue: end,
        onUpdate: (offset) => {
          if (!master) return;

          const tick = Math.round(offset / itemSize);
          const minTime = tickTimes[0] || 100;

          if (tick !== lastTick && Date.now() - lastTickTime > minTime) {
            lastTick = tick;
            lastTickTime = Date.now();

            tickTimes.shift();
            playSound("spin-tick");
          }
        },
      });

      if (!isMounted()) {
        return;
      }

      await Utility.wait(200);

      await animator.play({
        axis,
        timing: "ease",
        duration: Chests.alignTime,
        startValue: end,
        endValue: result,
        onPlay: () => {
          if (!master) return;

          playSound("spin-land");
        },
      });

      setPopout(true);
    }

    if (master && rolls.some((x) => chest.items[x.lootIndex].jackpot)) {
      playSound("confetti-jackpot");
      Effects.manager.play("ChestReel", "jackpot");
    }

    if (master) {
      setAnimating(false);
    }
  };

  return { ref: animator.ref, handleSpin };
};
