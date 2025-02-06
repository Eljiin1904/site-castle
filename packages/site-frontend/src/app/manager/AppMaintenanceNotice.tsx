import { Div } from "@client/comps/div/Div";
import { Link } from "@client/comps/link/Link";
import { Main } from "@client/comps/main/Main";
import { PageNotice } from "@client/comps/page/PageNotice";
import { Vector } from "@client/comps/vector/Vector";
import { SvgSiteLogo } from "@client/svgs/site/SvgSiteLogo";
import config from "#app/config";

export const AppMaintenanceNotice = () => {
  const { discordURL, twitterURL, twitterHandle } = config;

  return (
    <Main
      className="AppMaintenanceNotice"
      column
      center
      fx
      fy
      p={16}
      bg="brown-7"
    >
      <PageNotice
        image="/graphics/notice-chicken-update"
        title="Site Maintenance"
        message={
          <>
            {
              "We are working hard to improve your experience. Please check our "
            }
            <Link
              type="a"
              href={discordURL}
            >
              {"Discord"}
            </Link>
            {" or follow "}
            <Link
              type="a"
              href={twitterURL}
            >
              {twitterHandle}
            </Link>
            {" for updates."}
          </>
        }
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
