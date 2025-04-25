import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { SvgMenu } from "@client/svgs/common/SvgMenu";
import { SvgSiteLogo } from "@client/svgs/site/SvgSiteLogo";
import "./MenuHeader.scss";
import { useNavigate } from "react-router-dom";

export const MenuHeader = ({
  collapsed,
  handleToggle,
}: {
  collapsed: boolean;
  handleToggle: (x: boolean) => void;
}) => {
  const navigate = useNavigate();
  return (
    <Div
      className="MenuHeader"
      alignItems="center"
      pl={22}
      py={12}
    >
      <Div
        hover="highlight"
        zIndex={15}
      >
        <Vector
          as={SvgMenu}
          size={20}
          color="sand"
          mr={16}
          onClick={() => handleToggle(!collapsed)}
        />
        <Vector
          as={SvgSiteLogo}
          size={20}
          color="sand"
          mr={14}
          onClick={() => navigate("/")}
        />
      </Div>
    </Div>
  );
};
