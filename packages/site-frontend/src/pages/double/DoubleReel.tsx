import { useEffect, useMemo, useRef } from "react";
import { useIsMounted } from "usehooks-ts";
import { useSoundPlayer } from "@client/hooks/sounds/useSoundPlayer";
import { DoubleRoll } from "@core/types/double/DoubleRoll";
import { Div } from "@client/comps/div/Div";
import { Sounds } from "@client/services/sounds";
import { useAnimator } from "#app/hooks/animations/useAnimator";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Site } from "#app/services/site";
import { DoubleReelCard } from "./DoubleReelCard";

const origin = 2950;
const itemSize = 100;
const revolutions = 3;
const slideDuration = 6000;
const resultDuration = 3500;

export const DoubleReel = () => {
  const roundId = useAppSelector((x) => x.double.round._id);
  const status = useAppSelector((x) => x.double.round.status);
  const statusDate = useAppSelector((x) => x.double.round.statusDate);
  const roundRoll = useAppSelector((x) => x.double.round.roll);
  const animator = useAnimator();
  const isMounted = useIsMounted();
  const lastRound = useRef<string>();
  const playSound = useSoundPlayer("double");

  const getResultPos = (roll: DoubleRoll) => {
    const resultPos =
      origin - 15 * itemSize * revolutions - (roll.value - 1) * itemSize;
    return resultPos;
  };

  const spin = async (roll: DoubleRoll, initTime?: number) => {
    const resultPos = getResultPos(roll);
    const spinToPos = resultPos + roll.offset - 50;

    let lastTick = 0;
    let lastTickTime = 0;

    const tickTimes = [
      80, 80, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 80, 80,
      80, 80, 80, 80, 80,
    ];

    await animator.play({
      axis: "x",
      timing: "slide",
      duration: slideDuration,
      startValue: origin,
      endValue: spinToPos,
      initTime,
      onUpdate: (offset) => {
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

    await animator.play({
      axis: "x",
      timing: "ease",
      delay: 500,
      duration: 500,
      startValue: spinToPos,
      endValue: resultPos,
      onPlay: () => playSound("spin-land"),
    });

    if (!isMounted()) {
      return;
    }

    await reset(roll, resultDuration);
  };

  const reset = async (roll: DoubleRoll, delay: number) => {
    const resultPos = getResultPos(roll);

    animator.set("x", resultPos);

    await animator.play({
      axis: "x",
      timing: "ease",
      delay,
      duration: 1000,
      startValue: resultPos,
      endValue: origin,
    });
  };

  useEffect(() => {
    if (lastRound.current) {
      if (lastRound.current === roundId) return;
      if (status !== "simulating") return;
      if (!roundRoll) return;

      lastRound.current = roundId;

      spin(roundRoll);
    } else {
      if (status === "waiting" || status === "pending") return;
      if (!roundRoll) return;

      const timeInState = Math.max(0, Site.timeSince(statusDate));

      if (status === "simulating") {
        if (timeInState < slideDuration) {
          spin(roundRoll, timeInState);
        } else {
          reset(roundRoll, resultDuration + timeInState - slideDuration);
        }
      } else {
        if (timeInState < resultDuration) {
          reset(roundRoll, resultDuration - timeInState);
        } else {
          // just wait
        }
      }

      lastRound.current = roundId;
    }
  });

  const ItemsMemo = useMemo(() => {
    const items = [];

    for (let r = 0; r < 6; r++) {
      for (let i = 0; i < 15; i++) {
        items.push(
          <DoubleReelCard
            key={`${r}-${i}`}
            index={i + 1}
          />,
        );
      }
    }

    return items;
  }, []);

  return (
    <Div
      fx
      center
      overflow="hidden"
    >
      <Div
        forwardRef={animator.ref}
        className="inner-content"
        style={{ transform: `translateX(${origin}px)` }}
        gap={0}
      >
        {ItemsMemo}
      </Div>
    </Div>
  );
};
