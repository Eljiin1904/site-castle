import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import classNames from "classnames";
import { Div } from "../div/Div";
import { Span } from "../span/Span";
import { StyledLayoutProps } from "../styled/Styled";
import "./Catalog.scss";

export type CatalogProps<T> = StyledLayoutProps & {
  gap?: Unit;
  pages: T[][] | undefined;
  pageSize: number;
  emptyMessage: string;
  isFetching: boolean;
  hasNextPage: boolean | undefined;
  itemRenderer: (x: T, i: number) => JSX.Element;
  placeholderRenderer: (i: number) => JSX.Element;
  fetchNextPage: () => void;
};

export function Catalog<T>({
  className,
  gap = 12,
  pages,
  pageSize,
  emptyMessage,
  isFetching,
  hasNextPage,
  itemRenderer,
  placeholderRenderer,
  fetchNextPage,
  ...forwardProps
}: CatalogProps<T>) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return (
    <Div
      className={classNames("Catalog", className)}
      fx
      flow="row-wrap"
      gap={gap}
      {...forwardProps}
    >
      {pages && (pages.length === 0 || pages[0].length === 0) && (
        <Div
          fx
          center
          p={24}
          bg="brown-6"
          border
        >
          <Span weight="medium">{emptyMessage}</Span>
        </Div>
      )}
      {!pages && (
        <Fragment>
          {[...Array(pageSize)].map((x, i) => placeholderRenderer(i))}
        </Fragment>
      )}
      {pages &&
        pages.map((data, page) => (
          <Fragment key={page}>
            {data.map((x, i) => itemRenderer(x, i))}
          </Fragment>
        ))}
      <Div
        fx
        height={1}
      >
        <Div
          className="view-box"
          forwardRef={ref}
        />
      </Div>
    </Div>
  );
}
