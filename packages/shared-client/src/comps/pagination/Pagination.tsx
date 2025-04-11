import { FC } from "react";
import classNames from "classnames";
import { Button } from "../button/Button";
import { Div } from "../div/Div";
import { StyledLayoutProps } from "../styled/Styled";
import { Span } from "../span/Span";
import { SvgSliderArrow } from "#client/svgs/common/SvgSliderArrow";
import { SvgSliderArrowNext } from "#client/svgs/common/SvgSliderArrowNext";
import "./Pagination.scss";

export type PaginationProps = StyledLayoutProps & {
  page: number;
  lastPage: number;
  hasNext: boolean | undefined;
  setPage: (x: number) => void;
  fontSize?: Unit;
};

export const Pagination: FC<PaginationProps> = ({
  className,
  page,
  lastPage,
  hasNext,
  setPage,
  fontSize = 14,
  ...forwardProps
}) => {
  
  const options = [];
  if(page > 1) {
    options.push({label: "1", value: 1});
    if(page > 3)
      options.push({label: "...", value: -1});
    if(page - 1 > 1)
      options.push({label: `${page - 1}`, value: page - 1});   
  }
  options.push({label: `${page}`, value: page});
  if(page < lastPage)
  {
    if(page + 1 < lastPage)
      options.push({label: `${page + 1}`, value: page + 1});
    if(page + 2 < lastPage)
      options.push({label: "...", value: -1});
    options.push({label: `${lastPage}`, value: lastPage});
  }

  return (
    <Div
      className={classNames("Pagination", className)}
      align="center"
      justify="space-between"
      gap={16}
      {...forwardProps}
    >
      <Button
        kind="tertiary-grey"
        size="sso"
        icon={SvgSliderArrow}       
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      />
      {options.map((x, i) => (
        <Span
          key={i}
          color={x.value === page ? "light-sand" : "dark-sand"}
          cursor="pointer"
          onClick={() => {
            if (x.value !== -1) setPage(x.value);
          }}
        >
          {x.label}
        </Span>
      ))}
      <Button
       kind="tertiary-grey"
        size="sso"
        icon={SvgSliderArrowNext}       
        disabled={page === lastPage || !hasNext}
        onClick={() => setPage(page + 1)}
      />
    </Div>
  );
};
