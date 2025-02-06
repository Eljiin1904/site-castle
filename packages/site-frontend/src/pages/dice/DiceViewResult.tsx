import { Numbers } from "@core/services/numbers";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { SvgChicken } from "@client/svgs/common/SvgChicken";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Dice } from "#app/services/dice";
import "./DiceViewResult.scss";

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
          >
            <Vector
              className="icon"
              as={SvgChicken}
              size={64}
              color={ticket?.won ? "green" : "brown-5"}
            />
            <Span
              className="label"
              position="absolute"
              color={ticket?.won ? "black" : "gray"}
              weight="semi-bold"
              size={12}
            >
              {ticket
                ? Numbers.round(ticket.rollValue / 100, 2).toFixed(2)
                : ""}
            </Span>
          </Div>
        </Div>
      </Div>
    </Div>
  );
};
