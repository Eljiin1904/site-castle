import { CaseBattleDocument } from "@core/types/case-battles/CaseBattleDocument";
import { Div } from "@client/comps/div/Div";
import { BattleChestCard } from "./BattleChestCard";
import "./BattleChestGrid.scss";

export const BattleChestGrid = ({ battle }: { battle: CaseBattleDocument }) => {
  return (
    <Div
      className="BattleChestGrid"
      fx
      align="center"
      overflow="hidden"
    >
      {battle.chests.map((chest) => (
        <BattleChestCard
          key={chest._id}
          chest={chest}
        />
      ))}
      <Div
        className="fader"
        position="absolute"
        right={0}
        top={0}
        bottom={0}
      />
    </Div>
  );
};
