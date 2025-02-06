import { useEffect, useRef } from "react";
import classNames from "classnames";
import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BattleLogGrid } from "./BattleLogGrid";
import "./BattleLogs.scss";

export const BattleLogs = () => {
  const players = useAppSelector((x) => x.battlePlayer.players);
  const roundIndex = useAppSelector((x) => x.battlePlayer.roundIndex);
  const animate = useAppSelector((x) => x.battlePlayer.animate);
  const layout = useAppSelector((x) => x.style.mainLayout);
  const ref = useRef<HTMLDivElement>(null);

  let columns;
  if (players.length === 2) {
    if (layout === "mobile") {
      columns = 2;
    } else if (layout === "tablet") {
      columns = 3;
    } else {
      columns = 4;
    }
  } else if (players.length === 3) {
    if (layout === "mobile") {
      columns = 1;
    } else {
      columns = 2;
    }
  } else {
    if (layout === "mobile") {
      columns = 1;
    } else if (layout === "tablet") {
      columns = 1;
    } else {
      columns = 2;
    }
  }

  let offset = 1;
  if (layout !== "mobile") {
    offset += columns;
  }

  useEffect(() => {
    if (animate && ref.current) {
      const grids = [...ref.current.children];
      const cards = [...grids[0].children];
      const nextIndex = roundIndex + 1;
      const nextFocusIndex = Math.max(0, nextIndex - offset);
      const focus = cards[nextFocusIndex] as HTMLElement;

      ref.current.scrollTop = focus.offsetTop;
    }
  }, [animate, offset, roundIndex]);

  return (
    <Div
      className={classNames("BattleLogs", {
        [`players-${players.length}`]: players.length,
      })}
      forwardRef={ref}
      overflow="auto"
      bg="brown-8"
    >
      {players.map((player, i) => (
        <BattleLogGrid
          key={i}
          seat={i}
          columns={columns}
        />
      ))}
    </Div>
  );
};
