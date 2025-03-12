import { FC, RefObject } from "react";
import classNames from "classnames";
import { Intimal } from "@core/services/intimal";
import { StyledLayoutProps } from "../styled/Styled";
import { Div } from "../div/Div";
import { Span } from "../span/Span";
import { Vector } from "../vector/Vector";
import { SvgMoney } from "#client/svgs/common/SvgMoney";

export type TokensProps = StyledLayoutProps & {
  value: number;
  accent?: "positive" | "negative";
  color?: Color;
  vectorColor?: Color;
  fontSize?: Unit;
  hideIcon?: boolean;
  decimals?: number;
  integer?: boolean;
  valueRef?: RefObject<HTMLElement>;
};

export const Tokens: FC<TokensProps> = ({
  className,
  value,
  accent,
  color,
  vectorColor = "dark-sand",
  fontSize = 14,
  decimals = 2,
  integer,
  hideIcon,
  valueRef,
  ...forwardProps
}) => {
  if (!color) {
    if (accent === "positive") {
      color = "green";
    } else if (accent === "negative") {
      color = "light-red";
    } else {
      color = "light-sand";
    }
  }

  return (
    <Div
      className={classNames("Tokens", className)}
      display="inline-flex"
      center
      {...forwardProps}
    >
      {!hideIcon && (
        <Vector
          className="icon"
          as={SvgMoney}
          size={fontSize}
          mr={2}
          color={color}
        />
      )}
      <Span
        family="text"
        size={fontSize}
        color={color}
        fontWeight="medium"
      >
        {accent === "negative" && value > 0 && "-"}
        {/* {accent === "positive" && "+"} */}
      </Span>
      <Span
        family="text"
        fontWeight="medium"
        forwardRef={valueRef}
        size={fontSize}
        color={color}
      >
        {Intimal.toLocaleString(value, integer ? 0 : decimals)}
      </Span>
    </Div>
  );
};
