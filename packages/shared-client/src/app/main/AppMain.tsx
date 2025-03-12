import { FC, RefObject, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useResizeObserver } from "usehooks-ts";
import classNames from "classnames";
import { MainProps, Main } from "#client/comps/main/Main";
import { useLibraryDispatch } from "#client/hooks/store/useLibraryDispatch";
import { Style } from "#client/services/style";
import "./AppMain.scss";

export type AppMainProps = MainProps & {
  children: any;
};

export const AppMain: FC<AppMainProps> = ({
  children,
  ...forwardProps
}: {
  children: any;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const layout = useResizeHandler({ ref });

  useScrollHandler({ ref });

  return (
    <Main
      forwardRef={ref}
      className={classNames("AppMain", layout)}
      column
      grow
      align="center"
      overflow="auto"
      {...forwardProps}
    >
      {children}
    </Main>
  );
};

const useResizeHandler = ({ ref }: { ref: RefObject<HTMLDivElement> }) => {
  const dispatch = useLibraryDispatch();
  const { width } = useResizeObserver({ ref });
  const layout = width ? Style.getLayout(width) : undefined;

  useEffect(() => {
    if (layout) {
      dispatch(Style.setMainLayout(layout));
    }
  }, [layout]);

  return layout;
};

const useScrollHandler = ({ ref }: { ref: RefObject<HTMLDivElement> }) => {
  const location = useLocation();

  useEffect(() => {
    ref.current?.scrollTo(0, 0);
  }, [location]);

  return null;
};
