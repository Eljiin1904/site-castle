import { Div } from "@client/comps/div/Div";
import "./DoubleReelOverlay.scss";
import { Img } from "@client/comps/img/Img";
import { StyledProps } from "@client/comps/styled/Styled";

export type DoubleReelOverlayProps = Omit<StyledProps, "as"> & {
  path: string;
  children: React.ReactNode;
};

export const DoubleReelOverlay: React.FC<DoubleReelOverlayProps> = ({
  path,
  children,
  ...forwardProps
}: {
  path: string;
  children: React.ReactNode;
}) => {
  return (
    <Div
      className="DoubleReelOverlay"
      column
      {...forwardProps}
    >
      <Img
        path={path}
        type="jpg"
        width="100%"
        alt="background"
        className="background-image"
      />
      {children}
    </Div>
  );
};
