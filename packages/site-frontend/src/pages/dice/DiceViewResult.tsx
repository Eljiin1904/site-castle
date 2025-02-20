import { Numbers } from "@core/services/numbers";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Dice } from "#app/services/dice";
import "./DiceViewResult.scss";
import { SvgArrowRight } from "@client/svgs/common/SvgArrowRight";

export const DiceViewResult = () => {
  const ticket = useAppSelector((x) => x.dice.lastTicket);

  return (
    <Div
      className="DiceViewResult"
      position="absolute"
      fx
      pointerEvents="none"
    >
      <Div fx>
        <Div
          className="ctn"
          position="absolute"
          center
          style={{
            left: ticket
              ? `${(ticket.rollValue / Dice.maxValue) * 100}%`
              : "-200px",
          }}
        >
          <Div
            className="inner"
            center
            column
          >
            <Span
              className="label"
              color={ticket?.won ? "green" : "red"}
              fontWeight="regular"
              size={32}
            >
              {ticket
                ? Numbers.round(ticket.rollValue / 100, 2).toFixed(2)
                : ""}
            </Span>
            <Vector
              className="icon"
              as={SvgArrowRight}
              size={16}
              color={ticket?.won ? "green" : "red"}
            />            
          </Div>
        </Div>
      </Div>
    </Div>
  );
};