import { Conditional } from "@client/comps/conditional/Conditional";
import { Footer } from "@client/comps/footer/Footer";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Div } from "@client/comps/div/Div";
import { SiteLogo } from "#app/comps/site-logo/SiteLogo";
import { FooterCopyright } from "./FooterCopyright";
import { FooterDisclaimer } from "./FooterDisclaimer";
import { FooterMenus } from "./FooterMenus";
import { FooterPills } from "./FooterPills";
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
      bg="black-hover"
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
        px={20}
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
          borderColor={"brown-4"}
        />
        <Div>
          <FooterPills wrap />
        </Div>
        <Divider
          as={"div"}
          borderColor={"brown-4"}
        />
        <Div fx column py={20} gap={16}>
          <SiteLogo scale={0.9} />
          <FooterDisclaimer mt={20}/>
        </Div>
        <Divider
          as={"div"}
          borderColor={"brown-4"}
        />
        <Div fx column py={20} gap={20}
        >
          <FooterCopyright />
          <FooterContacts />
        </Div>
      </Div>
    </Div>
  );
};

const FooterTablet = () => {
  return (
    <Div
      column
      fx
      px={24}
    >
      <Div
        column
      >
        <Div
          fx
          justify="space-between"
          py={24}
        >
          <FooterMenus />
        </Div>
        <Divider
          as={"div"}
          borderColor={"brown-4"}
        />
        <FooterPills wrap />
        <Divider
          as={"div"}
          px={16}
          mt={10}
          borderColor={"brown-4"}
        />
        <Div column py={24} gap={24}>
          <SiteLogo />
          <FooterDisclaimer mt={24} />
        </Div>
        <Divider
          as={"div"}
          borderColor={"brown-4"}
        />
        <Div
          justify="flex-start"
          py={24}
          gap={24}
          fx
          column
        >
          <FooterCopyright />
          <FooterContacts />
        </Div>
      </Div>
    </Div>
  );
};

const FooterLaptopDesktop = ({ pad }: { pad?: boolean }) => {
  return (
    <Div
      column
      fx
      px={pad ? 40 : 0}
    >
      <Div
        column
      >
        <Div
          fx
          py={pad ? 40: 80}
          gap={40}
          justify="space-between"
        >
          <Div
            column
            align="flex-start"
            gap={20}
            style={{ width: "450px" }}
          >
            <SiteLogo />
            <FooterDisclaimer />
          </Div>
          <Div
            justify="space-around"
            grow
          >
            <FooterMenus />
          </Div>
        </Div>

        <Divider
          as={"div"}
          borderColor={"brown-4"}
        />
        <FooterPills />
        <Divider
          as={"div"}
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
