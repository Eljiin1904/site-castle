import { useRef, useState } from "react";
import { useTimeout } from "usehooks-ts";
import { useCountUp } from "react-countup";
import classNames from "classnames";
import { CaseBattlePlayerWithResult } from "@core/types/case-battles/CaseBattlePlayer";
import { Intimal } from "@core/services/intimal";
import { Div } from "@client/comps/div/Div";
import { Tokens } from "@client/comps/tokens/Tokens";
import { useSoundPlayer } from "@client/hooks/sounds/useSoundPlayer";
import { UserIcon } from "#app/comps/user-icon/UserIcon";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Effects } from "#app/services/effects";
import { useHiddenInfo } from "#app/hooks/users/useHiddenInfo";
import { BattleViewBox } from "./BattleViewBox";
import "./BattleViewResults.scss";

export const BattleViewResults = () => {
  const status = useAppSelector((x) => x.battlePlayer.status);
  const animate = useAppSelector((x) => x.battlePlayer.animate);
  const totalWon = useAppSelector((x) => x.battlePlayer.totalWon || 0);
  const playSound = useSoundPlayer("cases");

  const players = useAppSelector(
    (x) => x.battlePlayer.players,
  ) as CaseBattlePlayerWithResult[];

  if (status !== "completed") {
    return null;
  }

  useTimeout(() => {
    if (animate) {
      playSound(Intimal.toDecimal(totalWon) > 1 ? "count-long" : "count-short");
    }
  }, 1000);

  useTimeout(() => {
    if (animate) {
      playSound(Intimal.toDecimal(totalWon) > 1 ? "count-long" : "count-short");
    }
  }, 4000);

  useTimeout(() => {
    if (animate) {
      Effects.manager.play("player-info", "won");
      playSound("confetti-win");
    }
  }, 7000);

  return (
    <BattleViewBox className="BattleViewResults">
      {players.map((player, seat) =>
        animate ? (
          <PlayerResultAnimation
            key={seat}
            player={player}
            seat={seat}
          />
        ) : (
          <PlayerResult
            key={seat}
            player={player}
            seat={seat}
          />
        ),
      )}
    </BattleViewBox>
  );
};

const PlayerResult = ({
  player,
  seat,
}: {
  player: CaseBattlePlayerWithResult;
  seat: number;
}) => {
  const wonAmount = player.won ? player.wonAmount : 0;
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";
  const { hideInfo } = useHiddenInfo(player);

  return (
    <Div
      className={classNames("player-info", {
        bounce: player.won,
        [`seat-${seat}`]: seat,
      })}
      fx
      center
    >
      <Div
        className="inner-content"
        fx
        column
        center
        gap={small ? 12 : 16}
      >
        <UserIcon
          avatarId={player.bot ? undefined : player.avatarId}
          avatarIndex={player.avatarIndex}
          width={small ? "40px" : "80px"}
          hidden={hideInfo}
        />
        <Tokens
          value={wonAmount}
          fontSize={small ? 12 : 18}
          accent={wonAmount === 0 ? "negative" : "positive"}
        />
      </Div>
    </Div>
  );
};

const PlayerResultAnimation = ({
  player,
  seat,
}: {
  player: CaseBattlePlayerWithResult;
  seat: number;
}) => {
  const totalAmount = player.totalAmount;
  const wonAmount = player.won ? player.wonAmount : 0;

  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(totalAmount);
  const [bounce, setBounce] = useState(false);
  const valueRef = useRef(null);

  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";
  const { hideInfo } = useHiddenInfo(player);

  const counter = useCountUp({
    ref: valueRef,
    delay: start === 0 ? 1 : undefined,
    start: Intimal.toDecimal(start),
    end: Intimal.toDecimal(end),
    decimals: 2,
    duration: 2,
  });

  useTimeout(() => {
    setStart(totalAmount);
    setEnd(wonAmount);

    counter.start();
  }, 4000);

  useTimeout(() => {
    setBounce(player.won);
  }, 7000);

  return (
    <Div
      className={classNames("player-info", {
        [`seat-${seat}`]: seat,
        won: player.won,
        bounce,
      })}
      fx
      center
    >
      <Div
        className="inner-content"
        fx
        column
        center
        gap={small ? 12 : 16}
      >
        <UserIcon
          avatarId={player.bot ? undefined : player.avatarId}
          avatarIndex={player.avatarIndex}
          width={small ? "40px" : "80px"}
          hidden={hideInfo}
        />
        <Tokens
          value={0}
          fontSize={small ? 12 : 18}
          accent={
            start === 0 ? undefined : wonAmount === 0 ? "negative" : "positive"
          }
          valueRef={valueRef}
        />
      </Div>
    </Div>
  );
};
