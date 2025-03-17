import { To } from "react-router-dom";
import { Link } from "@client/comps/link/Link";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import "./MenuItem.scss";
import { FC } from "react";

type LinkProps = {type: "action" , onClick: () => void } | { type: "nav" ,to: To; end?: boolean; };
export const MenuItem:FC<{icon:Svg, iconRight?: Svg, label: string, labelColor?: Color, subText?: string | JSX.Element, showLabel: boolean} & LinkProps> = (props) => {
  
  const {showLabel, icon,iconRight, label, labelColor, subText} = props;
  return (
    <Link
      className="MenuItem"
      fx
      alignItems="center"
      pl={20}
      hover="none"
      {...props}
    >
      {showLabel ? (
       <MenuItemContent
        iconLeft={icon}
        labelColor={labelColor || "dark-sand"}
        label={label}
        subText={subText}
        iconRight={iconRight}
      />
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

const MenuItemContent = ({iconLeft, labelColor, label, subText, iconRight} : {
  iconLeft: Svg;
  labelColor: Color;
  label: string;
  subText?: string | JSX.Element;
  iconRight?: Svg;
}) => {

  return (<Div fx alignItems="center">
    <Vector
      className="icon"
      as={iconLeft}
      size={20}
      color={labelColor}
      mr={16}
    />
    <Div column>
      <Span
        className="label"
        color={labelColor}
        fontWeight="medium"
      >
        {label}
      </Span>
      {/* {subText} */}
    </Div>
    {iconRight && <Vector
      className="icon"
      as={iconRight}
      size={16}
      color={labelColor}
      ml={16}
      border
      borderColor={'brown-4'}
      pb={8}
      pt={2}
      pl={2}
      pr={8}
      />}
  </Div>)
};
