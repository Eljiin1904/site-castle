import { Conditional } from "@client/comps/conditional/Conditional";
import { Div } from "@client/comps/div/Div";
import { Header } from "@client/comps/header/Header";
import { Vector } from "@client/comps/vector/Vector";
import { SvgSiteIcon } from "@client/svgs/site/SvgSiteIcon";
import { Link } from "@client/comps/link/Link";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { HeaderGuest } from "./HeaderGuest";
import { HeaderUser } from "./HeaderUser";
import "./AppHeader.scss";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { SiteBalance } from "./SiteBalance";

export const AppHeader = () => {
  const layout = useAppSelector((x) => x.style.bodyLayout);

  return (
    <Header
      className="AppHeader"
      position="sticky"
      top={0}
      fx
      bg="brown-6"
      
      
    >
      <Conditional
        value={layout}
        mobile={<MobileHeader />}
        tablet={<NotMobileHeader />}
        laptop={<NotMobileHeader />}
        desktop={<NotMobileHeader />}
      />
    </Header>
  );
};

const MobileHeader = () => {
  const authenticated = useAppSelector((x) => x.user.authenticated);

  return (
    <Div
      fx
      align="center"
      px={16}
      borderBottom
      borderColor="brown-4"
      center
    >
      <Link
        type="router"
        to="/"
        flexBasis={0}
        position={"absolute"}
        left={20}
      >
        <Vector
          as={SvgSiteIcon}
          size={10}        
        />
      </Link>
      <Div
        align="center"
        justify="flex-end"
        grow
      >
        {authenticated ? <HeaderUser /> : <HeaderGuest />}
      </Div>
      {authenticated && <SiteBalance />}
    </Div>
  );
};

const NotMobileHeader = () => {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const layout = useAppSelector((x) => x.style.mainLayout);
  
  let px:Unit = 0;
  switch (layout) {
    case "laptop":
      px = 40;
      break;
    case "tablet":
      px = 24;
      break;
    case "mobile":
      px = 20;
      break;
  }

  return (
    <Div
      fx
      center
      borderBottom
      borderColor="brown-4"
    >
      <Div
        className="inner-content"
        fx
        px={px}
      >
        <Div
          grow
          align="center"
          justify="flex-end"
        >
          {authenticated ? <HeaderUser /> : <HeaderGuest />}
        </Div>
      </Div>
      {authenticated && <SiteBalance />}
    </Div>
  );
};
