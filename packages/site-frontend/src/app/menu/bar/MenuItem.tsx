import classNames from "classnames";
import { Link, LinkProps } from "@client/comps/link/Link";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";

type MenuItemProps = LinkProps & {
  id?: string;
  icon: Svg;
  label: string;
  active?: boolean;
};

export const MenuItem = ({
  icon,
  label,
  active,
  ...forwardProps
}: MenuItemProps) => {
  return (
    <Link
      className={classNames("menu-item", { active })}
      {...forwardProps}
      flexCenter
      fx
      fy
      hover="none"
    >
      <Div
        className="inner-content"
        column
      >
        <Vector
          className="icon"
          as={icon}
          size={16}
          color="dark-sand"
        />
        <Span
          className="label"
          size={10}
          fontWeight="medium"
          color="dark-sand"
          mt={8}
        >
          {label}
        </Span>
      </Div>
    </Link>
  );
};
