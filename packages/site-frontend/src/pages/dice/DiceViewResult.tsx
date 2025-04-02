import classNames from "classnames";
import { Numbers } from "@core/services/numbers";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Dice } from "#app/services/dice";
import { SvgArrowRight } from "@client/svgs/common/SvgArrowRight";
import "./DiceViewResult.scss";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";

export const DiceViewResult = () => {
  const ticket = useAppSelector((x) => x.dice.lastTicket);
  const small = useIsMobileLayout();
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
              className={classNames("label", { won: ticket?.won })}
              color={ "light-sand"}
              bg={ticket?.won ? "green" : "red-arrow"}
              fontWeight="regular"
              fontFamily="title"
              px={16}
              py={8}
              size={small ? 20: 24}
            >
              {ticket
                ? Numbers.round(ticket.rollValue / 100, 2).toFixed(2)
                : ""}
            </Span>
            <Vector
              className={classNames("icon", { won: ticket?.won })}
              as={SvgArrowRight}
              size={24}
              color={ticket?.won ? "green" : "red"}
            />            
          </Div>
        </Div>
      </Div>
    </Div>
  );
};