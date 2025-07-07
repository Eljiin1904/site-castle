import { FC } from "react";
import classNames from "classnames";
import { Style } from "#client/services/style";
import { useLibrarySelector } from "#client/hooks/store/useLibrarySelector";
import { DivProps, Div } from "../div/Div";
import "./Page.scss";

export type PageProps = DivProps;

export const Page: FC<PageProps> = ({
  className,
  children,
  ...forwardProps
}) => {
  const mainLayout = useLibrarySelector((x) => x.style.mainLayout);
  const theatreMode = useLibrarySelector((x) => x.style.theatreMode);
  return (
    <Div
      className={classNames("Page", className)}
      fx
      column
      grow
      px={theatreMode ? 0: Style.responsive(mainLayout, [20, 24, 40, 0])}
      py={theatreMode ? 0: Style.responsive(mainLayout, [20, 24, 40, 40])}
      gap={Style.responsive(mainLayout, [0, 24, 24, 24])}
      {...forwardProps}
    >
      {children}
    </Div>
  );
};