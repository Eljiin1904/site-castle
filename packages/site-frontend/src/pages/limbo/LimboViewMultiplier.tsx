import { useEffect, useRef } from "react";
import { useCountUp } from "react-countup";
import { Numbers } from "@core/services/numbers";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const LimboViewMultiplier = () => {
  const ticket = useAppSelector((x) => x.limbo.lastTicket);
  const layout = useAppSelector((x) => x.style.mainLayout);
  const sm = layout === "mobile";
  const valueRef = useRef<HTMLElement>(null);

  const multiplier = ticket ? ticket.rollMultiplier : 1;
  const color = ticket ? (ticket.won ? "green" : "light-red") : "light-gray";

  const counter = useCountUp({
    ref: valueRef,
    start: 1,
    end: Numbers.floor(multiplier, 2),
    delay: 0,
    decimals: 2,
    duration: 0.5,
  });

  useEffect(() => {
    counter.reset();
    counter.start();
  }, [multiplier]);

  return (
    <Div
      className="LimboViewMultiplier"
      fx
      grow
      center
      px={sm ? 16 : 32}
      bottom={16}
    >
      <Span
        forwardRef={valueRef}
        family="title"
        weight="bold"
        color={color}
        size={sm ? 48 : 100}
        style={ticket ? { transition: "color 250ms ease 150ms" } : undefined}
      >
        {"1.00"}
      </Span>
      <Span
        family="title"
        weight="bold"
        color={color}
        size={sm ? 40 : 80}
        ml={sm ? 4 : 8}
        style={ticket ? { transition: "color 250ms ease 150ms" } : undefined}
      >
        {"x"}
      </Span>
    </Div>
  );
};
