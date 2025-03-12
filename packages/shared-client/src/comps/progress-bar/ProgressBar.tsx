import { FC } from "react";
import classNames from "classnames";
import { Div } from "../div/Div";
import { StyledLayoutProps } from "../styled/Styled";

export type ProgressBarProps = Omit<StyledLayoutProps, "height"> & {
  height: 4 | 8;
  progress: number;
  fillColor?: Color;
};

export const ProgressBar: FC<ProgressBarProps> = ({
  height,
  progress,
  fillColor = "yellow",
  ...forwardProps
}) => {
  return (
    <Div
      className={classNames("ProgressBar")}
      fx
      height={height}
      bg="brown-4"
      borderRadius={height === 4 ? 2 : 4}
      overflow="hidden"
      {...forwardProps}
    >
      <Div
        className="bar-fill"
        position="absolute"
        fy
        bg={fillColor}
        style={{
          width: `${Math.round(progress * 100)}%`,
        }}
      />
    </Div>
  );
};
