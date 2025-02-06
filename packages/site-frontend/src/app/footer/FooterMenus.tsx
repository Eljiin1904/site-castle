import { Fragment } from "react";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { SvgExternal } from "@client/svgs/common/SvgExternal";
import { Link } from "@client/comps/link/Link";
import { MenuItem, useMenuData } from "./useMenuData";

export const FooterMenus = () => {
  const { games, support, community, about } = useMenuData();

  return (
    <Fragment>
      <MenuSection {...games} />
      <MenuSection {...support} />
      <MenuSection {...community} />
      <MenuSection {...about} />
    </Fragment>
  );
};

const MenuSection = ({
  heading,
  items,
}: {
  heading: string;
  items: MenuItem[];
}) => {
  return (
    <Div
      column
      gap={12}
    >
      <Span
        family="title"
        weight="bold"
        color="white"
        textTransform="uppercase"
        size={12}
        mb={8}
      >
        {heading}
      </Span>
      {items.map(({ label, ...itemProps }, i) => (
        <Link
          key={i}
          {...itemProps}
        >
          <Span
            weight="medium"
            color="gray"
          >
            {label}
          </Span>
          {itemProps.type === "a" && (
            <Vector
              as={SvgExternal}
              size={16}
              color="gray"
              ml={6}
            />
          )}
        </Link>
      ))}
    </Div>
  );
};
