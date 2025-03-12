import { FC, RefObject, useEffect, useRef } from "react";
import { useResizeObserver } from "usehooks-ts";
import classNames from "classnames";
import { DivProps, Div } from "#client/comps/div/Div";
import { useLibraryDispatch } from "#client/hooks/store/useLibraryDispatch";
import { Style } from "#client/services/style";

export type AppBodyProps = DivProps & {
  children: any;
};

export const AppBody: FC<AppBodyProps> = ({ children, ...forwardProps }) => {
  const ref = useRef<HTMLDivElement>(null);
  const layout = useResizeHandler({ ref });

  return (
    <Div
      forwardRef={ref}
      className={classNames("AppBody", layout)}
      fx
      fy
      column
      overflow="hidden"
      {...forwardProps}
    >
      {children}
    </Div>
  );
};

const useResizeHandler = ({ ref }: { ref: RefObject<HTMLDivElement> }) => {
  const dispatch = useLibraryDispatch();
  const { width } = useResizeObserver({ ref });
  const layout = width ? Style.getLayout(width) : undefined;

  useEffect(() => {
    if (layout) {
      dispatch(Style.setBodyLayout(layout));
    }
  }, [layout]);

  return layout;
};
