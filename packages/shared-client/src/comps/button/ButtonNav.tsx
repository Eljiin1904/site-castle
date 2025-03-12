import { useState, FC } from "react";
import { Div } from "../div/Div";
import { Span } from "../span/Span";
import { StyledLayoutProps } from "../styled/Styled";

type NavOption = {
  label: string;
  active: boolean;
  onClick: () => void;
};

export type ButtonNavProps = StyledLayoutProps & {
  disabled?: boolean;
  options: NavOption[];
};

export const ButtonNav: FC<ButtonNavProps> = ({ options, disabled }) => {
  return (
    <Div
      fx
      bg="brown-8"
    >
      {options.map((x, i) => (
        <NavItem
          key={i}
          disabled={disabled}
          {...x}
        />
      ))}
    </Div>
  );
};

const NavItem = ({
  label,
  active,
  disabled,
  onClick,
}: {
  label: string;
  active: boolean;
  disabled?: boolean;
  onClick: () => void;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Div
      fx
      center
      px={16}
      py={16}
      bg={active || hovered ? "brown-6" : "brown-8"}
      cursor={disabled ? "not-allowed" : "pointer"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={disabled ? undefined : onClick}
    >
      <Span
        weight="medium"
        color={active ? "sand" : "dark-sand"}
      >
        {label}
      </Span>
    </Div>
  );
};