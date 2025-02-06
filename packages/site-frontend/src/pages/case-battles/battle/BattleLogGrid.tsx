import classNames from "classnames";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { SvgChicken } from "@client/svgs/common/SvgChicken";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { BattleLogCard } from "./BattleLogCard";
import "./BattleLogGrid.scss";

export const BattleLogGrid = ({
  seat,
  columns,
}: {
  seat: number;
  columns: number;
}) => {
  const status = useAppSelector((x) => x.battlePlayer.status);
  const rounds = useAppSelector((x) => x.battlePlayer.rounds);
  const roundIndex = useAppSelector((x) => x.battlePlayer.roundIndex);
  const chests = useAppSelector((x) => x.battlePlayer.chestByRound);

  return (
    <Div
      className={classNames("BattleLogGrid", {
        [`columns-${columns}`]: columns,
      })}
      fx
      flow="row-wrap"
      gap={1}
    >
      {rounds.map((round, index) =>
        round.rolls.length === 0 ||
        (index === roundIndex && status !== "completed") ? (
          <Div
            key={index}
            center
            bg="brown-6"
          >
            <Vector
              position="absolute"
              as={SvgChicken}
              size={64}
              color="brown-5"
            />
            <Span
              family="title"
              weight="bold"
              size={16}
              top={2}
            >
              {index + 1}
            </Span>
          </Div>
        ) : (
          <BattleLogCard
            key={index}
            chest={chests[index]}
            item={chests[index].items[round.rolls[seat].lootIndex]}
          />
        ),
      )}
    </Div>
  );
};
