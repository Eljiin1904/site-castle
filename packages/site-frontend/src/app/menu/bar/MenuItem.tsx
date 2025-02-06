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
      bg="brown-6"
      hover="none"
    >
      <Div
        className="inner-content"
        column
      >
        <Vector
          className="icon"
          as={icon}
          size={18}
          color="gray"
        />
        <Span
          className="label"
          size={13}
          color="gray"
          mt={6}
        >
          {label}
        </Span>
      </Div>
    </Link>
  );
};
