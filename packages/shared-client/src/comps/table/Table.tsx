import { useEffect, useRef } from "react";
import classNames from "classnames";
import { Card } from "../cards/Card";
import { CardSection } from "../cards/CardSection";
import { Div } from "../div/Div";
import { Span } from "../span/Span";
import { Link, LinkProps } from "../link/Link";
import { StyledLayoutProps } from "../styled/Styled";
import { Spinner } from "../spinner/Spinner";
import "./Table.scss";

type DataSchema = {} | { _id: number | string };

export type TableColumn<T extends DataSchema> = {
  grow: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  justify: "center" | "flex-start" | "flex-end";
  heading: string | JSX.Element;
  hidden?: boolean;
  rowRenderer: (x: T, i: number) => any;
};

export type TableProps<T extends DataSchema> = StyledLayoutProps & {
  data: T[];
  columns: TableColumn<T>[];
  emptyMessage?: string;
  loading?: boolean;
  autoScroll?: boolean;
  onRowProps?: (x: T, i: number) => LinkProps;
};

export function Table<T extends DataSchema>({
  className,
  data,
  columns,
  emptyMessage = "No items founds.",
  loading,
  autoScroll,
  onRowProps = () => ({
    type: "action",
    hover: "none",
    onClick: () => {},
  }),
  ...forwardProps
}: TableProps<T>) {
  const ref = useRef<HTMLDivElement>(null);

  columns = columns.filter((x) => !x.hidden);

  useEffect(() => {
    autoScroll &&
      loading &&
      ref.current?.scrollIntoView({ block: "start", behavior: "smooth" });
  }, [autoScroll, loading]);

  return (
    <Div
      className={classNames("Table", className)}
      forwardRef={ref}
      column
      {...forwardProps}
    >
      <Div
       className="BetHeader"
       height={56}
       align="center"
       gap={24}
       py={12}
       borderWidth={1}
       borderColor="brown-4"
       borderTop
       borderBottom
       fx
      >
        {columns.map((x, i) => (
          <Div
            key={i}
            grow={x.grow}
            align="center"
            justify={x.justify}
          >
            {typeof x.heading === "string" ? (
              <Span
                weight="medium"
                size={12}
                color="dark-sand"
                textTransform="uppercase"
              >
                {x.heading}
              </Span>
            ) : (
              x.heading
            )}
          </Div>
        ))}
      </Div>
      <Div
        className="table-items"
        column
        fx
      >
        {!loading && data.length === 0 && (
          <Div fx center p={32}>
            <Span color="white">{emptyMessage}</Span>
          </Div>
        )}
        {loading && data.length === 0 && (
          <CardSection
            center
            py={24}
          >
            <Spinner size={32} />
          </CardSection>
        )}
        {data.map((item, itemIndex) => {
          const { className: rowName, ...rowProps } = onRowProps(
            item,
            itemIndex,
          );
          return (
            <Link
              key={"_id" in item ? item._id : itemIndex}
              className={classNames("table-item", rowName)}
              gap={24}
              hover="none"
              borderTop
              {...rowProps}
            >
              {columns.map((column, columnIndex) => (
                <Div
                  key={columnIndex}
                  grow={column.grow}
                  align="center"
                  justify={column.justify}
                >
                  {column.rowRenderer(item, itemIndex)}
                </Div>
              ))}
            </Link>
          );
        })}
      </Div>
    </Div>
  );
}