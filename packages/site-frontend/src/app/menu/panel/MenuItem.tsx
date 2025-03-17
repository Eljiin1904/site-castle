import { To } from "react-router-dom";
import { Link } from "@client/comps/link/Link";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import "./MenuItem.scss";

export const MenuItem = ({
  icon,
  label,
  labelColor = "dark-sand",
  subText,
  showLabel,
  to
}: {
  icon: Svg;
  label: string;
  labelColor?: Color;
  subText?: string | JSX.Element;
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
      alignItems="center"
      pl={20}
      hover="none"
    >
      {showLabel ? (
        <Div>
          <Vector
            className="icon"
            as={icon}
            size={16}
            color={labelColor}
            mr={16}
          />
          <Div column>
            <Span
              className="label fade-content"
              color={labelColor}
              fontWeight="medium"
            >
              {label}
            </Span>
            {subText}
          </Div>
        </Div>
      ) : (
        <Div center>
          <Vector
            as={icon}
            size={20}
            color="light-gray"
          />
        </Div>
      )}
    </Link>
  );
};

export const MenuItemAction = ({
  icon,
  label,
  labelColor = "dark-sand",
  subText,
  showLabel,
  onClick
}: {
  icon: Svg;
  label: string;
  labelColor?: Color;
  subText?: string | JSX.Element;
  showLabel: boolean;
  onClick: () => void;
}) => {
  return (
    <Div
      className="MenuItem"
      fx
      alignItems="center"
      pl={20}
      hover="none"
      onClick={onClick}
    >
      {showLabel ? (
        <Div>
          <Vector
            className="icon"
            as={icon}
            size={20}
            color={labelColor}
            mr={16}
          />
          <Div column>
            <Span
              className="label fade-content"
              color={labelColor}
              fontWeight="medium"
            >
              {label}
            </Span>
            {subText}
          </Div>
        </Div>
      ) : (
        <Div center>
          <Vector
            as={icon}
            size={20}
            color="light-gray"
          />
        </Div>
      )}
    </Div>
  );
}
