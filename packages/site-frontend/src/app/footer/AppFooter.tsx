import { Conditional } from "@client/comps/conditional/Conditional";
import { Footer } from "@client/comps/footer/Footer";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Div } from "@client/comps/div/Div";
import { SiteLogo } from "#app/comps/site-logo/SiteLogo";
import { FooterCopyright } from "./FooterCopyright";
import { FooterDisclaimer } from "./FooterDisclaimer";
import { FooterDropdowns } from "./FooterDropdowns";
import { FooterLanguage } from "./FooterLanguage";
import { FooterMenus } from "./FooterMenus";
import { FooterPills } from "./FooterPills";
import { FooterSocials } from "./FooterSocials";
import { FooterNotices } from "./FooterNotices";
import { FooterContacts } from "./FooterContacts";
import "./AppFooter.scss";

export const AppFooter = () => {
  const mainLayout = useAppSelector((x) => x.style.mainLayout);

  return (
    <Footer
      className="AppFooter"
      center
      fx
      bg="brown-8"
      borderTop
    >
      <Div
        className="inner-content"
        fx
      >
        <Conditional
          value={mainLayout}
          mobile={<FooterMobile />}
          tablet={<FooterTablet />}
          laptop={<FooterLaptopDesktop pad={true} />}
          desktop={<FooterLaptopDesktop />}
        />
      </Div>
    </Footer>
  );
};

const FooterMobile = () => {
  return (
    <Div
      column
      fx
    >
      <Div
        py={24}
        px={16}
      >
        <Div grow>
          <SiteLogo scale={0.9} />
        </Div>
        <Div gap={8}>
          <FooterSocials />
        </Div>
      </Div>
      <Div px={16}>
        <FooterDisclaimer />
      </Div>
      <Div py={24}>
        <FooterDropdowns />
      </Div>
      <Div px={16}>
        <FooterPills wrap />
      </Div>
      <Div
        py={24}
        px={16}
      >
        <FooterLanguage fx />
      </Div>
      <Div
        pb={24}
        px={16}
      >
        <FooterNotices />
      </Div>
      <Div
        column
        gap={12}
        px={16}
        pt={16}
        mt={16}
        borderTop
        color="brown-5"
      >
        <FooterContacts />
      </Div>
      <Div
        px={16}
        py={16}
        mt={16}
        borderTop
      >
        <FooterCopyright />
      </Div>
    </Div>
  );
};

const FooterTablet = () => {
  return (
    <Div
      column
      fx
      px={32}
    >
      <Div py={32}>
        <Div grow>
          <SiteLogo />
        </Div>
        <Div gap={8}>
          <FooterSocials />
        </Div>
      </Div>
      <Div>
        <FooterDisclaimer />
      </Div>
      <Div
        fx
        justify="space-between"
        py={32}
      >
        <FooterMenus />
      </Div>
      <FooterPills wrap />
      <Div py={32}>
        <FooterNotices />
      </Div>
      <Div
        gap={16}
        py={24}
        borderTop
        color="brown-5"
      >
        <FooterContacts />
      </Div>
      <Div
        align="center"
        justify="space-between"
        py={24}
        borderTop
      >
        <FooterCopyright />
        <FooterLanguage />
      </Div>
    </Div>
  );
};

const FooterLaptopDesktop = ({ pad }: { pad?: boolean }) => {
  return (
    <Div
      column
      fx
      px={pad ? 16 : undefined}
    >
      <Div
        fx
        py={48}
      >
        <Div
          column
          align="flex-start"
          gap={24}
          style={{ width: "350px" }}
        >
          <SiteLogo />
          <FooterDisclaimer />
          <Div gap={8}>
            <FooterSocials />
          </Div>
        </Div>
        <Div
          justify="space-around"
          grow
          ml={32}
        >
          <FooterMenus />
        </Div>
      </Div>
      <FooterPills />
      <Div py={32}>
        <FooterNotices />
      </Div>
      <Div
        gap={16}
        py={24}
        borderTop
        color="brown-5"
      >
        <FooterContacts />
      </Div>
      <Div
        align="center"
        justify="space-between"
        py={24}
        borderTop
      >
        <FooterCopyright />
        <FooterLanguage />
      </Div>
    </Div>
  );
};
