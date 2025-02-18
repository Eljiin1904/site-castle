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

export const AppHeader = () => {
  const layout = useAppSelector((x) => x.style.bodyLayout);

  return (
    <Header
      className="AppHeader"
      position="sticky"
      top={0}
      fx
      bg="brown-6"
      borderBottom
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
    >
      <Link
        type="router"
        to="/"
      >
        <Vector
          as={SvgSiteIcon}
          size={34}
        />
      </Link>
      <Div
        align="center"
        justify="flex-end"
        grow
      >
        {authenticated ? <HeaderUser /> : <HeaderGuest />}
      </Div>
    </Div>
  );
};

const NotMobileHeader = () => {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const layout = useAppSelector((x) => x.style.mainLayout);
  const pad = ["tablet", "laptop"].includes(layout);

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
        px={pad ? 40 : undefined}
      >
        <Div
          grow
          align="center"
          justify="flex-end"
        >
          {authenticated ? <HeaderUser /> : <HeaderGuest />}
        </Div>
      </Div>
    </Div>
  );
};
