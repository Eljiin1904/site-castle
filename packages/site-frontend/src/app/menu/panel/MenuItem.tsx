import { To } from "react-router-dom";
import { Link } from "@client/comps/link/Link";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import "./MenuItem.scss";
import { FC } from "react";
import { SvgArrowRight } from "@client/svgs/common/SvgArrowRight";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";

type LinkProps = {type: "action" , onClick: (e?:React.MouseEvent) => void } | { type: "nav" ,to: To; end?: boolean; };
export const MenuItem:FC<{icon?:Svg, isSubMenu?: boolean, open?: boolean, label: string, labelColor?: Color, subText?: string | JSX.Element, showLabel: boolean} & LinkProps> = (props) => {
  
  const {showLabel, icon,isSubMenu, open, label, labelColor, subText, ...remainingProps} = props;
  return (
    <Link
      className="MenuItem"
      fx
      alignItems="center"
      pl={20}
      hover="none"
      {...remainingProps}
    >
      {showLabel ? (
       <MenuItemContent
        iconLeft={icon}
        labelColor={labelColor || "dark-sand"}
        label={label}
        subText={subText}
        isSubMenu={isSubMenu}
        open={open}
      />
      ) : (icon &&
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

const MenuItemContent = ({iconLeft, labelColor, label, subText, isSubMenu, open} : {
  iconLeft?: Svg;
  labelColor: Color;
  label: string;
  subText?: string | JSX.Element;
  isSubMenu?: boolean;
  open?: boolean;
}) => {

  const small = useIsMobileLayout();
  return (<Div fx alignItems="center" gap={16}>
    {iconLeft && <Vector
      className="icon"
      as={iconLeft}
      size={20}
      color={labelColor}
    />}
    <Div column className="fade-content">
      <Span
        className="label"
        color={labelColor}
        fontWeight="medium"
      >
        {label}
      </Span>
      {/* {subText} */}
    </Div>
    {isSubMenu && <Vector
      className="icon fade-content"
      align="flex-end"
      as={SvgArrowRight}
      size={12}
      color={labelColor}
      border
      borderColor={'brown-4'}
      p={8}
      style={{transform: !open ? "rotate(180deg)" : "rotate(0deg)"}}
      position="absolute"
      right={ 20}
      />}
  </Div>)
};
