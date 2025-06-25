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
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Fragment } from "react";
import { PageBanner } from "#app/comps/site-page/PageBanner";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Div } from "@client/comps/div/Div";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Button } from "@client/comps/button/Button";
import { SvgArrowRight } from "@client/svgs/common/SvgArrowRight";
import { RouterLink } from "@client/comps/link/RouterLink";
import { Dialogs } from "@client/services/dialogs";
import { AccountMenuModal } from "#app/modals/menu/AccountMenuModal";
import { Vector } from "@client/comps/vector/Vector";
import { Span } from "@client/comps/span/Span";

export const AboutPage = () => {
  
  const {t} = useTranslation(['legal']);
  const small = useIsMobileLayout();
  
  return (<Fragment>
      <PageBanner image={`/graphics/legal-tile`} heading={t(`title`)} description="" content={<></>}/> 
      <SitePage
        className="GamesPage"
        gap={small? 32: 56}
        pb={small? 40: 56}
        px={small? 0: 32}
        pt={small ? 0: 56}
      >
      <Conditional value={ small ? "true":"false"} 
        true={<MobileContent />} 
        false={<NotMobileContent />}
        />
      </SitePage>
    </Fragment>
  );
};

const NotMobileContent = () => {
  return (
    <Div
      fx
      column
    >
      <Div
        fx
        gap={24}
      >
        <LegalMenu />
        <LegalView />
      </Div>
    </Div>
  );
};

const MobileContent = () => {

  return (<Div
    fx
    column
  >
    <LegalMenu />
    <Div fx px={20}>
      <LegalView />
    </Div>
  </Div>);  
};

const LegalMenu = () => {

  const {t} = useTranslation(['legal']);
  const layout = useAppSelector((x) => x.style.mainLayout);

  const items = [
    { label: t('nav.terms'), to: "/about/terms-of-service" },
    { label: t('nav.privacy'), to: "/about/privacy-policy" },
    { label: t('nav.kyc'), to: "/about/kyc-policy" },
    { label: t('nav.aml'), to: "/about/aml-policy" },
    { label: t('nav.responsibleGaming'), to: "/about/responsible-gaming" },
  ];

  return (<Conditional value={layout}
    mobile={<LegalMenuMobile items={items}/>}
    tablet={<LegalMenuDesktop items={items} layout={layout} />}
    laptop={<LegalMenuDesktop items={items} layout={layout} />}
    desktop={<LegalMenuDesktop items={items} layout={layout} />}
  />);
};

const LegalMenuMobile = ({items}: {
  items: { label: string; to: string, icon?: Svg }[];
}) => {

  const selectedOption = items.find((item) => item.to === window.location.pathname);
  if(!items || items.length === 0) return null;
  return (<Button 
        label={selectedOption?.label ?? items[0].label}
        iconLeft={selectedOption?.icon}
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

const LegalMenuDesktop = ({items, layout}: {
  items: { label: string; to: string, icon?:Svg }[];
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
            {item.icon && <Vector
              as={item.icon}             
            />}
            <Div column>
              <Span>{item.label}</Span>             
            </Div>
          </RouterLink>)}
      </Div>
    </Div>
  );
};

const LegalView = () => {
  
  const small = useIsMobileLayout();
  return (
    <Div
      fx
      overflow="hidden"
      pt={small ? 24 : 0}
    >
      <Div fx column  gap={small ? 32 : 56} alignItems="flex-start" position="relative" grow>
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
      </Div>
    </Div>
  );
};
