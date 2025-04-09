import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import classNames from "classnames";
import './MinesHistoryCard.scss';
import { MinesEventDocument } from "@core/types/mines/MinesEventDocument";
import { Numbers } from "@core/services/numbers";

export const MinesHistoryCard = ({ game }: { game: MinesEventDocument }) => {
  const { won, multiplier } = game;

  return (
    <Div
      className={classNames("MinesHistoryCard", { win: won })}
      center
      py={6}
      px={12}
    >
      <Span
        size={12}       
      >
        {`${Numbers.floor(multiplier, 2).toFixed(2)}`}X
      </Span>
    </Div>
  );
};