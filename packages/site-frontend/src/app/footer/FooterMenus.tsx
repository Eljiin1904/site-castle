import { Fragment } from "react";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { SvgExternal } from "@client/svgs/common/SvgExternal";
import { Link } from "@client/comps/link/Link";
import { MenuItem, useMenuData } from "./useMenuData";
import { Conditional } from "@client/comps/conditional/Conditional";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { StyledProps } from "@client/comps/styled/Styled";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";

export const FooterMenus = () => {
  const mainLayout = useAppSelector((x) => x.style.mainLayout);
  return (
    <Fragment>
      <Div
        className="inner-content"
        fx
      >
        <Conditional
          value={mainLayout}
          mobile={<DisplayMenuSectionsMobile />}
          tablet={<DisplayMenuSectionsNonMobile justify="space-between" />}
          laptop={<DisplayMenuSectionsNonMobile />}
          desktop={<DisplayMenuSectionsNonMobile />}
        />
      </Div>
    </Fragment>
  );
};
const DisplayMenuSectionsNonMobile = ({justify = "space-around"}: {justify?: StyledProps['justifyContent']}) => {
  const { games, support, community } = useMenuData();
  return (
    <Div
      width={"full"}
      justifyContent={justify}
    >
      <MenuSection {...games} />
      <MenuSection {...support} />
      <MenuSection {...community} />
    </Div>
  );
};

const DisplayMenuSectionsMobile = () => {
  const { games, support, community } = useMenuData();
  return (
    <Div
      width={"full"}
      
      column
      gap={32}
    >
      <Div
        justify="flex-start"
        gap={100}
      >
        <MenuSection {...games} />
        <MenuSection {...support} />      
      </Div>

      <Div
        justify="flex-start"
        gap={100}
      >
         <MenuSection heading={community.heading} items={community.items.filter((x,pos) => pos%2 === 0)} />
         <MenuSection heading={""} items={community.items.filter((x,pos) => pos%2 === 1)}  />
      </Div>
    </Div>
  );
};

const MenuSection = ({ heading, items }: { heading: string; items: MenuItem[] }) => {
  
  const small = useIsMobileLayout()
  return (
    <Div
      column
      gap={16}
     style={{width: small ? "50%": "auto"}}
    >
      <Span
        family="title"
        weight="regular"
        color="light-sand"
        textTransform="uppercase"
        lineHeight={24}
        size={16}
      >
        {heading}
      </Span>
      {items.map(({ label, icon, ...itemProps }, i) => (
        <Link
          key={i}
          {...itemProps}
        >
          {itemProps.type === "a" && (
            <Vector
              as={icon || SvgExternal}
              size={16}
              mr={10}
            />
          )}
          <Span>
            {label}
          </Span>
        </Link>
      ))}
    </Div>
  );
};
