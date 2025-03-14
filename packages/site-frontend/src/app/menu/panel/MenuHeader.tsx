import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { SvgMenu } from "@client/svgs/common/SvgMenu";
import { SvgSiteLogo } from "@client/svgs/site/SvgSiteLogo";
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
      pl={22}
      py={12}
    >
      <Div
        hover="highlight"
        onClick={() => handleToggle(!collapsed)}
      >
        <Vector
          as={SvgMenu}
          size={20}
          color="sand"
          mr={16}
        />
        <Vector
          as={SvgSiteLogo}
          size={20}
          color="sand"
          mr={14}
        />
      </Div>
    </Div>
  );
};
