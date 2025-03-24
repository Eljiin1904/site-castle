import { Conditional } from "@client/comps/conditional/Conditional";
import { Footer } from "@client/comps/footer/Footer";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Div } from "@client/comps/div/Div";
import { SiteLogo } from "#app/comps/site-logo/SiteLogo";
import { FooterCopyright } from "./FooterCopyright";
import { FooterDisclaimer } from "./FooterDisclaimer";
import { FooterMenus } from "./FooterMenus";
import { FooterPills } from "./FooterPills";
import { FooterSocials } from "./FooterSocials";
import { FooterContacts } from "./FooterContacts";
import "./AppFooter.scss";
import { Divider } from "@client/comps/divider/Divider";

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
        column
        bg="brown-6"
        px={28}
      >
        <Div
          fx
          justify="space-between"
          py={20}
        >
          <FooterMenus />
        </Div>

        <Divider
          as={"div"}
          px={16}
          mt={10}
          borderColor={"brown-4"}
        />
        <Div>
          <FooterPills wrap />
        </Div>
        <Divider
          as={"div"}
          px={16}
          mt={10}
          borderColor={"brown-4"}
        />
        <Div
          py={24}
          px={16}
        >
          <Div grow>
            <SiteLogo scale={0.9} />
          </Div>
        </Div>

        <Div>
          <FooterDisclaimer />
        </Div>
        <Divider
          as={"div"}
          px={16}
          mt={10}
          borderColor={"brown-4"}
        />
        <Div
          py={4}
          mt={16}
        >
          <FooterCopyright />
        </Div>
        <Div
          column
          gap={12}
          mt={16}
          mb={24}
          color="brown-5"
        >
          <FooterContacts />
        </Div>
      </Div>

      <FooterSocials />
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
      <Div
        column
        bg="brown-6"
        px={28}
      >
        <Div
          fx
          justify="space-between"
          py={32}
        >
          <FooterMenus />
        </Div>

        <Divider
          as={"div"}
          px={16}
          mt={10}
          borderColor={"brown-4"}
        />
        <FooterPills wrap />
        <Divider
          as={"div"}
          px={16}
          mt={10}
          borderColor={"brown-4"}
        />
        <Div py={32}>
          <Div grow>
            <SiteLogo />
          </Div>
        </Div>
        <Div>
          <FooterDisclaimer />
        </Div>
        <Divider
          as={"div"}
          px={16}
          mt={10}
          pb={20}
          borderColor={"brown-4"}
        />
        <Div
          align="center"
          justify="space-between"
          py={4}
        >
          <FooterCopyright />
        </Div>
        <Div
          gap={16}
          py={24}
          color="brown-5"
        >
          <FooterContacts />
        </Div>
      </Div>
      <FooterSocials />
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
        column
        bg="brown-6"
        px={28}
      >
        <Div
          fx
          py={48}
        >
          <Div
            column
            align="flex-start"
            gap={24}
            style={{ width: "450px" }}
          >
            <SiteLogo />
            <FooterDisclaimer />
          </Div>
          <Div
            justify="space-around"
            grow
            ml={32}
          >
            <FooterMenus />
          </Div>
        </Div>

        <Divider
          as={"div"}
          mt={10}
          borderColor={"brown-4"}
        />
        <FooterPills />
        <Divider
          as={"div"}
          mt={10}
          borderColor={"brown-4"}
        />
        <Div
          align="center"
          justify="space-between"
          py={40}
        >
          <FooterCopyright />
          <FooterContacts />
        </Div>
      </Div>
    </Div>
  );
};
