import { FC } from "react";
import { useLibrarySelector } from "#client/hooks/store/useLibrarySelector";
import { DivProps, Div } from "../div/Div";

export type ModalFooterProps = DivProps;

export const ModalFooter: FC<ModalFooterProps> = ({
  children,
  ...forwardProps
}) => {
  const bodyLayout = useLibrarySelector((x) => x.style.bodyLayout);
  const small = bodyLayout === "mobile";

  return (
    <Div
      fx
      px={small ? 16 : 24}
      py={small ? 12 : 16}
      borderTop
      {...forwardProps}
    >
      {children}
    </Div>
  );
};
