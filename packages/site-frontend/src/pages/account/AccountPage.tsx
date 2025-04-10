import { Fragment } from "react";
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
import { PageBanner } from "#app/comps/site-page/PageBanner";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { Span } from "@client/comps/span/Span";
import { RouterLink } from "@client/comps/link/RouterLink";
import { SvgBets } from "#app/svgs/common/SvgBets";
import { SvgSettings } from "@client/svgs/common/SvgSettings";
import { SvgVerification } from "@client/svgs/common/SvgVerification";
import { SvgTransaction } from "@client/svgs/common/SvgTransaction";
import { SvgStats } from "@client/svgs/common/SvgStats";

export const AccountPageOld = () => {
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
          { label: "Profile Information", to: "/account", end: true },
          { label: "User Stats", to: "/account/stats" },
          { label: "Transactions", to: "/account/transactions" },          
          { label: "Game History", to: "/account/game-history" },
          { label: "Verification", to: "/account/verification" },
          { label: "Settings", to: "/account/settings" }
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

export const AccountPage = () => {

  const {t} = useTranslation(['account']);
  const small = useIsMobileLayout();

  return (<Fragment>
      <PageBanner image={`/graphics/account-tile`} heading={t(`title`)} description="" content={<></>}/> 
      <SitePage
        className="GamesPage"
        gap={small ? 32: 56}
        pb={small ? 32: 56}
      >
      <NotMobileContent />
      </SitePage>
    </Fragment>
    );
};


// const MobileContent = () => {
//   const { t } = useTranslation(["games\\dice"]);
//   return (
//     <Div
//       fx
//       column
//       gap={16}
//     >
//       <DiceHeader />
//       <DiceView />
//       <DiceMenu />
//       <BetBoard
//         px={20}
//         mt={40}
//         mb={40}
//         title={t("games\\dice:betBoardHeader")}
//         game="dice"
//       />
//     </Div>
//   );
// };

const NotMobileContent = () => {
  const { t } = useTranslation(["account"]);
  return (
    <Div
      fx
      column
    >
      <Div
        fx
        gap={24}
      >
        <AccountMenu />
        <AccountView />
      </Div>
    </Div>
  );
};

const AccountMenu = () => {

  const small = useIsMobileLayout();
  const {t} = useTranslation(['account']);
  const items = [
    { label: t("profile"), to: "/account", icon: SvgUser, end: true },
    { label: t("stats"), to: "/account/stats", icon: SvgStats },
    { label: t("transactions"), to: "/account/transactions", icon: SvgTransaction },
    { label: t("gameHistory"), to: "/account/game-history", icon: SvgBets },
    { label: t("verification"), to: "/account/verification", icon: SvgVerification },
    { label: t("settings"), to: "/account/settings", icon: SvgSettings }
  ];

  return (
    <Div
      display="block"
      style={
        small
          ? undefined
          : {
              minWidth: "320px",
              maxWidth: "320px",
            }
      }
    >
      <Div
        column
        bg="brown-6"
        px={small ? 20 : 24}
        fx
      >
      {items.map((item, i) => <RouterLink
            display="flex"
            type="router"
            to={item.to}
            py={20}
            borderBottom={i !== items.length - 1}
            borderColor="brown-4"
            key={item.to}
            gap={16}
          >
            <Vector
              as={item.icon}
             
            />
            <Div column>
              <Span>{item.label}</Span>             
            </Div>
          </RouterLink>)}
      </Div>
    </Div>
  );
};

const AccountView = () => {
  
  return (
    <Div
      fx
      column
      center
      border
      bg="brown-8"
      overflow="hidden"
    >
      <Div fx position="relative" grow>
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
      </Div>
    </Div>
  );
};
