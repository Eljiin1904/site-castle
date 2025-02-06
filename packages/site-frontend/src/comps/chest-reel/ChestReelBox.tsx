import { FC, Fragment, memo } from "react";
import classNames from "classnames";
import { ChestLayout } from "@core/types/chests/ChestLayout";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { StyledLayoutProps } from "@client/comps/styled/Styled";
import "./ChestReelBox.scss";

export type ChestReelBoxProps = StyledLayoutProps & {
  layout: ChestLayout;
  children: any;
};

export const ChestReelBox: FC<ChestReelBoxProps> = memo(
  ({ className, layout, children, ...forwardProps }) => {
    return (
      <Div
        className={classNames("ChestReelBox", className)}
        column={layout === "horizontal"}
        fx
        border
        {...forwardProps}
      >
        {children}
        {layout === "vertical" && (
          <Fragment>
            <Vector
              className="arrow arrow-left"
              as={SvgReelArrow}
              size={16}
            />
            <Vector
              className="arrow arrow-right"
              as={SvgReelArrow}
              size={16}
            />
          </Fragment>
        )}
        {layout === "horizontal" && (
          <Fragment>
            <Vector
              className="arrow arrow-top"
              as={SvgReelArrow}
              size={16}
            />
          </Fragment>
        )}
      </Div>
    );
  },
);

const SvgReelArrow = () => {
  return (
    <svg
      width="15"
      height="30"
      viewBox="0 0 5 10"
      fill="none"
    >
      <linearGradient id="SvgReelArrow-lg">
        <stop
          offset={0}
          stopColor="var(--light-yellow-color)"
        />
        <stop
          offset={1}
          stopColor="var(--yellow-color)"
        />
      </linearGradient>
      <path
        d="M5 5L1.31174e-07 10L0 5.46244e-08L5 5Z"
        fill="url(#SvgReelArrow-lg)"
        stroke="var(--brown-7-color)"
        strokeWidth="1"
      />
    </svg>
  );
};
