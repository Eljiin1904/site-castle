import { FC } from "react";
import classNames from "classnames";
import { useLibrarySelector } from "#client/hooks/store/useLibrarySelector";
import { SvgTimes } from "#client/svgs/common/SvgTimes";
import { Div } from "../div/Div";
import { Vector } from "../vector/Vector";
import { Span } from "../span/Span";
import { Heading } from "../heading/Heading";
import "./ModalHeader.scss";
import { StyledProps } from "../styled/Styled";

type NavOptions = {
  label: string;
  active: boolean;
  onClick: () => void;
}[];

export type ModalHeaderProps = {
  className?: string;
  headerContent?: JSX.Element;
  heading?: string | NavOptions;
  hideClose?: boolean;
  closeColor?: StyledProps['color'];
  noBorder?: boolean;
  onCloseClick?: () => void;
};

export const ModalHeader: FC<ModalHeaderProps> = ({
  className,
  headerContent,
  heading,
  hideClose,
  closeColor = 'dark-sand',
  noBorder = false,
  onCloseClick,
}) => {
  const layout = useLibrarySelector((x) => x.style.bodyLayout);
  const small = layout === "mobile";

  let content;

  if (heading === undefined) {
    content = null;
  } else if (typeof heading === "string") {
    content = (
      <Div
        fx
        fy
        alignItems="flex-start"
        px={small ? 20 : 32}

      >
        <Div
          fx
          fy          
          column
          py={small ? 20 : 32}
          borderBottom={!noBorder}
          borderColor="brown-4"
        >
          <Heading
            as="h2"
            size={small ? 20 : 24}
            fx
            textTransform="uppercase"
            fontWeight="regular"
          >
            {heading}
          </Heading>
          {headerContent}
        </Div>
      </Div>
    );
  } else {
    content = (
      <Div
        fx
        mx={small ? 16 : 24}
        mt={24}
        gap={24}
        borderBottom
      >
        {heading.map((x, i) => (
          <NavItem
            key={i}
            {...x}
          />
        ))}
      </Div>
    );
  }

  return (
    <Div
      className={classNames("ModalHeader", className)}
      fx
      zIndex={1}
    >
      {content}
      {!hideClose && (
        <Vector
          as={SvgTimes}
          size={16}
          color={closeColor}
          position="absolute"
          right={12}
          top={12}
          hover="highlight"
          onClick={onCloseClick}
        />
      )}
    </Div>
  );
};

const NavItem = ({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <Div
      className={classNames("nav-item", { active })}
      px={12}
      pb={12}
      top={1}
      onClick={onClick}
    >
      <Span
        className="label"
        weight="semi-bold"
      >
        {label}
      </Span>
    </Div>
  );
};
