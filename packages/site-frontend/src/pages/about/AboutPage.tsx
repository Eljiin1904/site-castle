import { Routes, Route, Navigate } from "react-router-dom";
import { PageNav } from "@client/comps/page/PageNav";
import { PageTitle } from "@client/comps/page/PageTitle";
import { SvgInfoCircle } from "@client/svgs/common/SvgInfoCircle";
import { SitePage } from "#app/comps/site-page/SitePage";
import { PrivacyBody } from "./privacy/PrivacyBody";
import { TermsBody } from "./terms/TermsBody";
import { KycBody } from "./kyc/KycBody";
import { ResponsibleBody } from "./responsible/ResponsibleBody";
import { AmlBody } from "./aml/AmlBody";

export const AboutPage = () => {
  return (
    <SitePage
      className="AboutPage"
      title="About"
    >
      <PageTitle
        icon={SvgInfoCircle}
        heading="About"
      />
      <PageNav
        items={[
          { label: "Terms of Service", to: "/about/terms-of-service" },
          { label: "Privacy Policy", to: "/about/privacy-policy" },
          { label: "KYC Policy", to: "/about/kyc-policy" },
          { label: "AML Policy", to: "/about/aml-policy" },
          { label: "Responsible Gaming", to: "/about/responsible-gaming" },
        ]}
      />
      <Routes>
        <Route
          path="/terms-of-service"
          element={<TermsBody />}
        />
        <Route
          path="/privacy-policy"
          element={<PrivacyBody />}
        />
        <Route
          path="/kyc-policy"
          element={<KycBody />}
        />
        <Route
          path="/aml-policy"
          element={<AmlBody />}
        />
        <Route
          path="/responsible-gaming"
          element={<ResponsibleBody />}
        />
        <Route
          path="*"
          element={
            <Navigate
              replace
              to="/about/terms-of-service"
            />
          }
        />
      </Routes>
    </SitePage>
  );
};
