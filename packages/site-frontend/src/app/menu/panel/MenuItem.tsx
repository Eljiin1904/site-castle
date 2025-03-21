import { To } from "react-router-dom";
import { Link } from "@client/comps/link/Link";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import "./MenuItem.scss";
import { FC } from "react";
import { SvgArrowRight } from "@client/svgs/common/SvgArrowRight";
import { Site } from "#app/services/site";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";

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

const MenuItemContent = ({iconLeft, labelColor, label, subText, isSubMenu = false, open} : {
  iconLeft?: Svg;
  labelColor: Color;
  label: string;
  subText?: string | JSX.Element;
  isSubMenu?: boolean;
  open?: boolean;
}) => {

  const dispatch = useAppDispatch();
  const menuOpen = useAppSelector((x) => x.site.menuOverlayOpen);
  const layout = useAppSelector((x) => x.style.bodyLayout);
  const small = ["mobile", "tablet"].includes(layout);

  const handleClose = () => {
    if (!isSubMenu && small && menuOpen) {
      dispatch(Site.toggleMenuOverlay(false));
    }
  };

  return (<Div fx alignItems="center" gap={16} onClick={handleClose}>
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
      style={{transform: open ? "rotate(180deg)" : "rotate(0deg)"}}
      position="absolute"
      right={ 20}
      />}
  </Div>)
};
