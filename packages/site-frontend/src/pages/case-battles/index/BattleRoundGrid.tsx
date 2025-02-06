import { useEffect, useRef } from "react";
import { CaseBattleDocument } from "@core/types/case-battles/CaseBattleDocument";
import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BattleRoundCard } from "./BattleRoundCard";
import "./BattleRoundGrid.scss";

export const BattleRoundGrid = ({ battle }: { battle: CaseBattleDocument }) => {
  const roundIndex = battle.roundIndex;
  const chests = [];
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";
  const ref = useRef<HTMLDivElement>(null);

  for (const chest of battle.chests) {
    for (let i = 0; i < chest.count; i++) {
      chests.push(chest);
    }
  }

  let offset;

  if (layout === "mobile") {
    offset = 2;
  } else if (layout === "tablet") {
    offset = 3;
  } else {
    offset = 4;
  }

  useEffect(() => {
    if (ref.current) {
      const cards = [...ref.current.children];
      const index = Math.max(0, roundIndex - offset);
      const focus = cards[index] as HTMLElement;

      ref.current.scrollLeft = focus.offsetLeft;
    }
  }, [offset, roundIndex]);

  return (
    <Div
      className="BattleRoundGrid"
      forwardRef={ref}
      fx
      fy
      align="center"
      style={{
        height: small ? "64px" : "84px",
      }}
    >
      {chests.map((chest, i) => (
        <BattleRoundCard
          key={i}
          chest={chest}
          active={roundIndex === i}
        />
      ))}
    </Div>
  );
};
