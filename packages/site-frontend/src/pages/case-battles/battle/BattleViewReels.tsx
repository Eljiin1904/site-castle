import { Fragment, useEffect, useMemo, useRef } from "react";
import { ChestReelBox } from "#app/comps/chest-reel/ChestReelBox";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useChestReels } from "#app/comps/chest-reel/useChestReels";
import { BattleReelDivider } from "./BattleReelDivider";

export const BattleViewReels = () => {
  const rounds = useAppSelector((x) => x.battlePlayer.rounds);
  const roundIndex = useAppSelector((x) => x.battlePlayer.roundIndex);
  const chests = useAppSelector((x) => x.battlePlayer.chestByRound);
  const players = useAppSelector((x) => x.battlePlayer.players);
  const animate = useAppSelector((x) => x.battlePlayer.animate);
  const spinRef = useRef(-1);

  const round = rounds[roundIndex];
  const chest = chests[roundIndex];

  const volumePrefix = "case-battles";

  const { Reels, spin } = useChestReels({
    chest,
    layout: "vertical",
    speed: "fast",
    openCount: players.length,
    volumePrefix,
  });

  useEffect(() => {
    if (round.rolls.length === 0) {
      return;
    }
    if (spinRef.current === roundIndex) {
      return;
    }
    if (!animate) {
      return;
    }

    spinRef.current = roundIndex;

    spin(round.rolls);
  }, [round, roundIndex, animate]);

  const Sections = useMemo(
    () =>
      Reels.map((Reel, seat) => (
        <Fragment key={seat}>
          {seat > 0 && <BattleReelDivider seat={seat} />}
          {Reel}
        </Fragment>
      )),
    [Reels],
  );

  return <ChestReelBox layout="vertical">{Sections}</ChestReelBox>;
};
