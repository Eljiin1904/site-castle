import { Div } from "@client/comps/div/Div";
import { Main } from "@client/comps/main/Main";
import { PageNotice } from "@client/comps/page/PageNotice";
import { Vector } from "@client/comps/vector/Vector";
import { SvgSiteLogo } from "@client/svgs/site/SvgSiteLogo";

export const AppOutdatedNotice = () => {
  return (
    <Main
      className="AppOutdatedNotice"
      column
      center
      fx
      fy
      p={16}
      bg="brown-7"
    >
      <PageNotice
        image="/graphics/notice-chicken-update"
        title="Update Required"
        message="Your version is out of date. Please reload the page."
        buttonLabel="Reload Page"
        onButtonClick={() => window.location.reload()}
      />
      <Div grow />
      <Vector
        as={SvgSiteLogo}
        width={254}
        height={40}
      />
      <Div grow />
    </Main>
  );
};
