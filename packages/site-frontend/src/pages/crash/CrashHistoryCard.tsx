import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import classNames from "classnames";
import './CrashHistoryCard.scss';


export const CrashHistoryCard = ({ round }: { round: {multiplier: number, won: boolean} }) => {
  
  const { multiplier, won } = round;

  return (
    <Div
      className={classNames("CrashHistoryCard", { win: won })}
      center
      py={6}
      px={12}
    >
      <Span
        size={12}       
      >
        {multiplier}X
      </Span>
    </Div>
  );
};