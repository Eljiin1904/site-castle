import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { SvgMenu } from "@client/svgs/common/SvgMenu";
import { SvgCaretLeft } from "@client/svgs/common/SvgCaretLeft";
import "./MenuHeader.scss";

export const MenuHeader = ({
  collapsed,
  handleToggle,
}: {
  collapsed: boolean;
  handleToggle: (x: boolean) => void;
}) => {
  return (
    <Div
      className="MenuHeader"
      alignItems="center"
      pl={24}
      py={12}
      borderBottom
    >
      <Div
        hover="highlight"
        onClick={() => handleToggle(!collapsed)}
      >
        <Vector
          as={collapsed ? SvgMenu : SvgCaretLeft}
          size={16}
          color="gray"
          mr={12}
        />
        {!collapsed && (
          <Span
            className="fade-content"
            weight="semi-bold"
            color="gray"
          >
            {"Menu"}
          </Span>
        )}
      </Div>
    </Div>
  );
};
