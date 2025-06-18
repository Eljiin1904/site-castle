import { FC, Fragment } from "react";
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
  message?: string | JSX.Element;
  description?: string;
  small?: boolean;
  buttonLabel?: string;
  onButtonClick?: () => void;
  children?: JSX.Element | JSX.Element[];
};

export const PageNotice: FC<PageNoticeProps> = ({
  className,
  small,
  ...forwardProps
}) => {
  return (
    <Div
      className={classNames("PageNotice", className)}
      center
      grow
      gap={40}
      column={small}
      pb={small? 40: 0}
      {...forwardProps}
    >
      {small ? (
          <PageNoticeContentMobile {...forwardProps} />
        ) : (
          <PageNoticeContentDesktop {...forwardProps} />
        )}
    </Div>
  );
};

const PageNoticeContentMobile: FC<PageNoticeProps> = ({
  image,
  icon,
  title,
  message,
  description,
  buttonLabel,
  onButtonClick,
  children
}) => { 
  return (
    <Fragment>
      <Div fx>
        {image && <Img type="png" path={image} width="100%" />}
        {icon && <Vector as={icon} size={40} />}
      </Div>
      <Div column fx gap={24} center>
        <Heading
          as="h1"
          className="title"
          textTransform="uppercase"
          size={32}
          lineHeight={32}
          textAlign="center"
        >
          {title}
        </Heading>
        {message && (
          <Span
            className="message"
            textAlign="center"
          >
            {message}
          </Span>
        )}
        {buttonLabel && (
          <Button
            kind="primary-yellow"
            size="md"
            label={buttonLabel}
            onClick={onButtonClick}
            style={{ width: "fit-content" }}
          ></Button>
        )}
        {description && (
          <Span
            color="double-red"
            textAlign="center"
          >
            {description}
          </Span>
        )}
      </Div>      
    </Fragment>
  );
};
const PageNoticeContentDesktop: FC<PageNoticeProps> = ({
  image,
  icon,
  title,
  titleSize = 64,
  message,
  description,
  buttonLabel,
  onButtonClick,
  children
}) => {
  return (
    <Fragment>
      <Div column width={400} gap={56}>
        <Heading
          as="h1"
          className="title"
          size={titleSize}
          textTransform="uppercase"
          lineHeight={56}
        >
          {title}
        </Heading>
        {message && (
          <Div
          display="block"
          className="message"
          fontSize={14}
        >
          {message}
        </Div>
        )}
        {buttonLabel && (
          <Button
            kind="primary-yellow"
            size="md"
            label={buttonLabel}
            onClick={onButtonClick}
            style={{ width: "fit-content" }}
          ></Button>
        )}
        {description && (
          <Span
            fontSize={14}
            color="double-red"
          >
            {description}
          </Span>
        )}
      </Div>
      <Div width={400}>
        {image && <Div>
          <Img  type="png" path={image} width="100%" style={{maxWidth: '451px'}} />
          {children}
        </Div>}
        {icon && <Vector as={icon} size={40} />}
      </Div>
    </Fragment>)
}
