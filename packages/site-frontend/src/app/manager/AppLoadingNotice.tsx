import { Div } from "@client/comps/div/Div";
import { Main } from "@client/comps/main/Main";
import { Spinner } from "@client/comps/spinner/Spinner";
import { Vector } from "@client/comps/vector/Vector";
import { SvgSiteIcon } from "@client/svgs/site/SvgSiteIcon";

export const AppLoadingNotice = () => {
  return (
    <Main
      className="AppLoadingNotice"
      center
      fx
      fy
      bg="brown-7"
    >
      <Div center>
        <Vector
          as={SvgSiteIcon}
          size={80}
          bg="white"
        />
        <Spinner
          position="absolute"
          size={156}
          color="gold"
        />
      </Div>
    </Main>
  );
};
