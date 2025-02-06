import { Routes, Route, Navigate } from "react-router-dom";
import { PageNav } from "@client/comps/page/PageNav";
import { PageTitle } from "@client/comps/page/PageTitle";
import { SvgMedal } from "@client/svgs/common/SvgMedal";
import { SitePage } from "#app/comps/site-page/SitePage";
import { OverviewBody } from "./overview/OverviewBody";
import { BoostsBody } from "./boosts/BoostsBody";
import { StoreBody } from "./store/StoreBody";
import { CasesBody } from "./level-case-index/CasesBody";
import { ClaimsBody } from "./claims/ClaimsBody";

export const RewardsPage = () => {
  return (
    <SitePage
      className="RewardsPage"
      title="Rewards"
    >
      <PageTitle
        icon={SvgMedal}
        heading="Rewards"
      />
      <PageNav
        items={[
          { label: "Overview", to: "/rewards", end: true },
          { label: "Boosts", to: "/rewards/boosts" },
          { label: "Gem Store", to: "/rewards/gems" },
          { label: "Level Cases", to: "/rewards/level-cases" },
          { label: "Claim", to: "/rewards/claim" },
        ]}
      />
      <Routes>
        <Route
          index
          element={<OverviewBody />}
        />
        <Route
          path="/boosts"
          element={<BoostsBody />}
        />
        <Route
          path="/gems"
          element={<StoreBody />}
        />
        <Route
          path="/level-cases"
          element={<CasesBody />}
        />
        <Route
          path="/claim"
          element={<ClaimsBody />}
        />
        <Route
          path="*"
          element={
            <Navigate
              replace
              to="/rewards"
            />
          }
        />
      </Routes>
    </SitePage>
  );
};
