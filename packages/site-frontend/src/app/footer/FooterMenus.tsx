import { Fragment } from "react";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { SvgExternal } from "@client/svgs/common/SvgExternal";
import { Link } from "@client/comps/link/Link";
import { MenuItem, useMenuData } from "./useMenuData";
import { Conditional } from "@client/comps/conditional/Conditional";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

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
          tablet={<DisplayMenuSectionsNonMobile />}
          laptop={<DisplayMenuSectionsNonMobile />}
          desktop={<DisplayMenuSectionsNonMobile />}
        />
      </Div>
    </Fragment>
  );
};
const DisplayMenuSectionsNonMobile = () => {
  const { games, support, community } = useMenuData();
  return (
    <Div
      width={"full"}
      justifyContent="space-around"
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
      justify="space-around"
      column
    >
      <Div
        justify="space-between"
        pb={12}
      >
        <MenuSection {...games} />
        <MenuSection {...support} />
      </Div>

      <Div
        column
        gap={12}
        mt={20}
      >
        <Span
          family="title"
          weight="bold"
          color="white"
          textTransform="uppercase"
          size={12}
          mb={8}
        >
          {community.heading}
        </Span>
        <Div
          justify="space-between"
          flexFlow="row"
        >
          {community.items.map(({ label, ...itemProps }, i) => (
            <Link
              key={i}
              {...itemProps}
              style={{ lineHeight: 1.5 }}
            >
              {itemProps.type === "a" && (
                <Vector
                  as={itemProps.icon || SvgExternal}
                  size={16}
                  color="dark-sand"
                  mr={10}
                />
              )}
              <Span
                weight="medium"
                color="dark-sand"
              >
                {label}
              </Span>
            </Link>
          ))}
        </Div>
      </Div>
    </Div>
  );
};

const MenuSection = ({ heading, items }: { heading: string; items: MenuItem[] }) => {
  
  return (
    <Div
      column
      gap={16}
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
              color="dark-sand"
              mr={10}
            />
          )}
          <Span
            weight="medium"
            color="dark-sand"
            size={14}
            lineHeight={20}
          >
            {label}
          </Span>
        </Link>
      ))}
    </Div>
  );
};
