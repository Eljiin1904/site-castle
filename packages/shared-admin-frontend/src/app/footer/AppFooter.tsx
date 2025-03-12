import { Div } from "@client/comps/div/Div";
import { Footer } from "@client/comps/footer/Footer";
import { SiteLogo } from "#app/comps/site-logo/SiteLogo";

export const AppFooter = () => {
  return (
    <Footer
      className="AppFooter"
      fx
      justify="center"
      bg="brown-8"
      borderTop
    >
      <Div
        fx
        py={48}
        center
        style={{ maxWidth: "var(--max-width)" }}
      >
        <SiteLogo />
      </Div>
    </Footer>
  );
};
