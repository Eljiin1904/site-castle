import classNames from "classnames";
import { Link } from "@client/comps/link/Link";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";

export const NavItem = ({
  icon,
  label,
  to,
  onClick,
}: {
  icon: Svg;
  label: string;
  to?: string;
  onClick: () => void;
}) => {
  return (
    <Link
      className={classNames("nav-item")}
      {...(to
        ? {
            type: "nav",
            to,
            end: true,
          }
        : {
            type: "action",
          })}
      px={16}
      py={12}
      alignItems="center"
      hover="none"
      onClick={onClick}
    >
      <Vector
        className="icon"
        as={icon}
        size={20}
        mr={14}
      />
      <Span className="label">{label}</Span>
    </Link>
  );
};
