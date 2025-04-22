import { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import { StatsBody } from "./stats/StatsBody";
import { Conditional } from "@client/comps/conditional/Conditional";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { CustomDropdown } from "@client/comps/dropdown/CustomDropdown";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Button } from "@client/comps/button/Button";
import { SvgArrowRight } from "@client/svgs/common/SvgArrowRight";
import { ModalField } from "@client/comps/modal/ModalField";
import { Dialogs } from "@client/services/dialogs";
import { AccountMenuModal } from "#app/modals/menu/AccountMenuModal";


export const AccountPage = () => {

  const {t} = useTranslation(['account']);
  const layout = useAppSelector((x) => x.style.mainLayout);

  return (<Fragment>
      <PageBanner image={`/graphics/account-tile`} heading={t(`title`)} description="" content={<></>}/> 
      <SitePage
        className="GamesPage"
        gap={layout == 'mobile' ? 32: 56}
        pb={layout == 'mobile' ? 40: 56}
        px={layout == 'mobile' ? 0: 32}
        pt={layout == 'mobile' ? 0: 24}
      >
      <Conditional value={layout} 
        mobile={<MobileContent />} 
        tablet={<NotMobileContent />}
        laptop={<NotMobileContent />}
        desktop={<NotMobileContent />}
       />
      </SitePage>
    </Fragment>
    );
};


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

const MobileContent = () => {

  return (<Div
    fx
    column
  >
    <AccountMenu />
    <Div fx px={20}>
      <AccountView />
    </Div>
  </Div>);  
};

const AccountMenu = () => {

  const {t} = useTranslation(['account']);
  const layout = useAppSelector((x) => x.style.mainLayout);

  const items = [
    { label: t("profile"), to: "/account", icon: SvgUser, end: true },
    { label: t("stats.title"), to: "/account/stats", icon: SvgStats },
    { label: t("transactions.title"), to: "/account/transactions", icon: SvgTransaction },
    { label: t("gameHistory"), to: "/account/game-history", icon: SvgBets },
    { label: t("verification.title"), to: "/account/verification", icon: SvgVerification },
    { label: t("settings.title"), to: "/account/settings", icon: SvgSettings }
  ];

  return (<Conditional value={layout}
    mobile={<AccountMenuMobile items={items}/>}
    tablet={<AccountMenuDesktop items={items} layout={layout} />}
    laptop={<AccountMenuDesktop items={items} layout={layout} />}
    desktop={<AccountMenuDesktop items={items} layout={layout} />}
  />);
};

const AccountMenuMobile = ({items}: {
  items: { label: string; to: string; icon: any }[];
}) => {

  const selectedOption = items.find((item) => item.to === window.location.pathname);
  if(!items || items.length === 0) return null;
  return (<Button 
        iconLeft={selectedOption?.icon ?? items[0].icon}
        label={selectedOption?.label ?? items[0].label}
        iconRight={SvgArrowRight}
        fx
        kind="menu-item"
        iconSize={20}
        bg="black-hover"
        size="lg"
        justifyContent="space-between"
        border
        borderColor="brown-4"
        labelColor="light-sand" 
        onClick={() => Dialogs.open("primary", <AccountMenuModal items={items}/>)}
        />
      );
};

const AccountMenuDesktop = ({items, layout}: {
  items: { label: string; to: string; icon: any }[];
  layout: "mobile" | "tablet" | "laptop" | "desktop";
}) => {

  const location = window.location.pathname;
  return (
    <Div
      display="block"
      style={
        layout === "tablet"
          ? {
            minWidth: "260px",
            maxWidth: "260px",
          }
          : {
              minWidth: "320px",
              maxWidth: "320px",
            }
      }
    >
      <Div
        column
        bg="brown-6"
        px={24}
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
            className={`${location === item.to ? "active" : ""}`}
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
      overflow="hidden"
    >
      <Div fx position="relative" grow>
        <Routes>
            <Route
              index
              element={<ProfileBody />}
            />
            <Route
              path="/stats"
              element={<StatsBody />}
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
