import { FC } from "react";
import { useLibrarySelector } from "#client/hooks/store/useLibrarySelector";
import { DivProps, Div } from "../div/Div";

export type ModalBodyProps = DivProps;

export const ModalBody: FC<ModalBodyProps> = ({
  children,
  ...forwardProps
}) => {
  const bodyLayout = useLibrarySelector((x) => x.style.bodyLayout);
  const space: Unit = bodyLayout === "mobile" ? 24 : 32;
  const padding: Unit = bodyLayout === "mobile" ? 20 : 32;
  
  return (
    <Div
      fx
      fy
      column
      //justify={justify}
      align="center"
      p={padding}
      gap={space}
      overflow="auto"
      {...forwardProps}
    >
      {children}
    </Div>
  );
};
