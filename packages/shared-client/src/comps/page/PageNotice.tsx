import { FC } from "react";
import classNames from "classnames";
import { Button } from "../button/Button";
import { Div } from "../div/Div";
import { Img } from "../img/Img";
import { Heading } from "../heading/Heading";
import { Span } from "../span/Span";
import { StyledLayoutProps } from "../styled/Styled";
import "./PageNotice.scss";
import { Vector } from "../vector/Vector";

export type PageNoticeProps = Omit<StyledLayoutProps, "children"> & {
  image?: string;
  icon?: Svg;
  title: string;
  titleSize?: Unit;
  message: string | JSX.Element;
  description?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
};

export const PageNotice: FC<PageNoticeProps> = ({
  className,
  image,
  icon,
  title,
  titleSize = 24,
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
      gap={40}
      {...forwardProps}
    >
      {image && <Img  type="png" path={image} width="256px" />}
      {icon && <Vector as={icon} size={40} />}
      
      <Heading
        as="h1"
        className="title"
        size={titleSize}
        textAlign="center"
        textTransform="uppercase"
      >
        {title}
      </Heading>
      <Div
        display="block"
        className="message"
        fontSize={14}
        textAlign="center"
        px={16}
      >
        {message}
      </Div>
      {buttonLabel && (
        <Button
          kind="primary-yellow"
          size="md"
          label={buttonLabel}
          fx
          style={{ maxWidth: "400px" }}
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
