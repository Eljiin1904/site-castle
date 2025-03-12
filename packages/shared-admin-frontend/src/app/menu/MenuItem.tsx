import { To } from "react-router-dom";
import { Link } from "@client/comps/link/Link";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import "./MenuItem.scss";

export const MenuItem = ({
  icon,
  label,
  showLabel,
  to,
}: {
  icon: Svg;
  label: string;
  showLabel: boolean;
  to: To;
}) => {
  return (
    <Link
      className="MenuItem"
      type="nav"
      to={to}
      end={to === "/"}
      fx
      pl={20}
      alignItems="center"
      hover="none"
    >
      {showLabel ? (
        <>
          <Vector
            className="icon"
            as={icon}
            size={16}
            color="gray"
            mr={12}
          />
          <Span
            className="label fade-content"
            color="gray"
            weight="semi-bold"
          >
            {label}
          </Span>
        </>
      ) : (
        <Div center>
          <Vector
            as={icon}
            size={16}
            color="gray"
          />
        </Div>
      )}
    </Link>
  );
};
