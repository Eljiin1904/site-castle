import { FC } from "react";
import classNames from "classnames";
import { Button } from "../button/Button";
import { Div } from "../div/Div";
import { StyledLayoutProps } from "../styled/Styled";
import { Span } from "../span/Span";
import "./Pagination.scss";

export type PaginationProps = StyledLayoutProps & {
  page: number;
  hasNext: boolean | undefined;
  setPage: (x: number) => void;
  fontSize?: Unit;
};

export const Pagination: FC<PaginationProps> = ({
  className,
  page,
  hasNext,
  setPage,
  fontSize = 14,
  ...forwardProps
}) => {
  return (
    <Div
      className={classNames("Pagination", className)}
      fx
      align="center"
      justify="space-between"
      {...forwardProps}
    >
      <Button
        kind="secondary"
        size="sm"
        label="Previous"
        labelSize={fontSize}
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      />
      <Span
        weight="semi-bold"
        size={fontSize}
      >
        {`Page ${page}`}
      </Span>
      <Button
        kind="secondary"
        size="sm"
        label="Next"
        labelSize={fontSize}
        disabled={!hasNext}
        onClick={() => setPage(page + 1)}
      />
    </Div>
  );
};
