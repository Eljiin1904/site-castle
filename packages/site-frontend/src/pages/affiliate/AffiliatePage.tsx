import { Routes, Route, Navigate } from "react-router-dom";
import { PageNav } from "@client/comps/page/PageNav";
import { PageTitle } from "@client/comps/page/PageTitle";
import { SvgTeam } from "@client/svgs/common/SvgTeam";
import { SitePage } from "#app/comps/site-page/SitePage";
import { DashboardBody } from "./dashboard/DashboardBody";
import { ReferralsBody } from "./referrals/ReferralsBody";

export const AffiliatePage = () => {
  return (
    <SitePage
      className="AffiliatePage"
      title="Affiliate"
      privileged
    >
      <PageTitle
        icon={SvgTeam}
        heading="Affiliate"
      />
      <PageNav
        items={[
          { label: "Dashboard", to: "/affiliate", end: true },
          { label: "Referrals", to: "/affiliate/referrals" },
        ]}
      />
      <Routes>
        <Route
          index
          element={<DashboardBody />}
        />
        <Route
          path="/referrals"
          element={<ReferralsBody />}
        />
        <Route
          path="*"
          element={
            <Navigate
              replace
              to="/affiliate"
            />
          }
        />
      </Routes>
    </SitePage>
  );
};
