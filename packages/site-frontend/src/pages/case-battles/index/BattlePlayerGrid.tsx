import { Fragment } from "react";
import { CaseBattleDocument } from "@core/types/case-battles/CaseBattleDocument";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { CaseBattles } from "#app/services/case-battles";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BattlePlayerCard } from "./BattlePlayerCard";
import { BattleSeatCard } from "./BattleSeatCard";

export const BattlePlayerGrid = ({
  battle,
  onJoinClick,
}: {
  battle: CaseBattleDocument;
  onJoinClick: (seat: number) => void;
}) => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile";
  const category = CaseBattles.getModeCategory(battle.mode);

  return (
    <Div gap={small ? 4 : 8}>
      {battle.players.map((player, i) => (
        <Fragment key={i}>
          {player ? (
            <BattlePlayerCard player={player} />
          ) : (
            <BattleSeatCard onClick={() => onJoinClick(i)} />
          )}
          {((category === "Team Battle" && i === 1) ||
            (category === "FFA Battle" && i !== battle.players.length - 1)) && (
            <Div center>
              <Span
                family="title"
                weight="bold"
                size={small ? 8 : 10}
              >
                {"VS"}
              </Span>
            </Div>
          )}
        </Fragment>
      ))}
    </Div>
  );
};
