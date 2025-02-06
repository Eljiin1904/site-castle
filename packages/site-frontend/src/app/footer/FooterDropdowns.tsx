import { useState } from "react";
import { SvgExternal } from "@client/svgs/common/SvgExternal";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Link } from "@client/comps/link/Link";
import { Vector } from "@client/comps/vector/Vector";
import { SvgCaretDown } from "@client/svgs/common/SvgCaretDown";
import { SvgCaretUp } from "@client/svgs/common/SvgCaretUp";
import { MenuItem, useMenuData } from "./useMenuData";

export const FooterDropdowns = () => {
  const { games, support, community, about } = useMenuData();

  return (
    <Div
      fx
      column
    >
      <MenuDropdown {...games} />
      <MenuDropdown {...support} />
      <MenuDropdown {...community} />
      <MenuDropdown {...about} />
    </Div>
  );
};

const MenuDropdown = ({
  heading,
  items,
}: {
  heading: string;
  items: MenuItem[];
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Div
      column
      gap={12}
      p={16}
      borderTop
      borderBottom
    >
      <Div
        fx
        mb={open ? 4 : undefined}
        onClick={() => setOpen((x) => !x)}
      >
        <Span
          family="title"
          weight="bold"
          color="white"
          textTransform="uppercase"
          size={12}
        >
          {heading}
        </Span>
        <Div
          grow
          justify="flex-end"
        >
          <Vector
            as={open ? SvgCaretUp : SvgCaretDown}
            size={16}
            color="gray"
          />
        </Div>
      </Div>
      {open &&
        items.map(({ label, ...itemProps }, i) => (
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
