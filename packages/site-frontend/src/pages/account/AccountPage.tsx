import { Routes, Route, Navigate } from "react-router-dom";
import { PageNav } from "@client/comps/page/PageNav";
import { PageTitle } from "@client/comps/page/PageTitle";
import { SvgUser } from "@client/svgs/common/SvgUser";
import { SitePage } from "#app/comps/site-page/SitePage";
import { HistoryBody } from "./history/HistoryBody";
import { ProfileBody } from "./profile/ProfileBody";
import { SettingsBody } from "./settings/SettingsBody";
import { TransactionsBody } from "./transactions/TransactionsBody";
import { VerificationBody } from "./verification/VerificationBody";

export const AccountPage = () => {
  return (
    <SitePage
      className="AccountPage"
      title="Account"
      privileged
    >
      <PageTitle
        icon={SvgUser}
        heading="Account"
      />
      <PageNav
        items={[
          { label: "Profile", to: "/account", end: true },
          { label: "Settings", to: "/account/settings" },
          { label: "Transactions", to: "/account/transactions" },
          { label: "Game History", to: "/account/game-history" },
          { label: "Verification", to: "/account/verification" },
        ]}
      />
      <Routes>
        <Route
          index
          element={<ProfileBody />}
        />
        <Route
          path="/settings"
          element={<SettingsBody />}
        />
        <Route
          path="/transactions"
          element={<TransactionsBody />}
        />
        <Route
          path="/game-history"
          element={<HistoryBody />}
        />
        <Route
          path="/verification"
          element={<VerificationBody />}
        />
        <Route
          path="*"
          element={
            <Navigate
              replace
              to="/account"
            />
          }
        />
      </Routes>
    </SitePage>
  );
};
