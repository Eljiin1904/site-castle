import { FC } from "react";
import classNames from "classnames";
import { Button } from "../button/Button";
import { Div } from "../div/Div";
import { Img } from "../img/Img";
import { Heading } from "../heading/Heading";
import { Span } from "../span/Span";
import { StyledLayoutProps } from "../styled/Styled";
import "./PageNotice.scss";

export type PageNoticeProps = Omit<StyledLayoutProps, "children"> & {
  image: string;
  title: string;
  message: string | JSX.Element;
  description?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
};

export const PageNotice: FC<PageNoticeProps> = ({
  className,
  image,
  title,
  message,
  description,
  buttonLabel,
  onButtonClick,
  ...forwardProps
}) => {
  return (
    <Div
      className={classNames("PageNotice", className)}
      column
      center
      grow
      {...forwardProps}
    >
      <Img
        type="png"
        path={image}
        width="256px"
      />
      <Heading
        as="h1"
        className="title"
        size={20}
        textAlign="center"
        mt={32}
        mb={16}
        textTransform="uppercase"
      >
        {title}
      </Heading>
      <Div
        display="block"
        className="message"
        fontSize={14}
        color="gray"
        textAlign="center"
        px={16}
      >
        {message}
      </Div>
      {buttonLabel && (
        <Button
          kind="primary"
          size="lg"
          label={buttonLabel}
          mt={32}
          style={{ minWidth: "200px" }}
          onClick={onButtonClick}
        ></Button>
      )}
      {description && (
        <Span
          fontSize={14}
          color="red"
          mt={24}
        >
          {description}
        </Span>
      )}
    </Div>
  );
};
