import { Routes, Route, Navigate } from "react-router-dom";
import { SitePage } from "#app/comps/site-page/SitePage";
import { InfoBody } from "./info/InfoBody";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Conditional } from "@client/comps/conditional/Conditional";
import { Button } from "@client/comps/button/Button";
import { Dialogs } from "@client/services/dialogs";
import { AccountMenuModal } from "#app/modals/menu/AccountMenuModal";
import { Div } from "@client/comps/div/Div";
import { RouterLink } from "@client/comps/link/RouterLink";
import { Span } from "@client/comps/span/Span";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Fragment } from "react";
import { PageBanner } from "#app/comps/site-page/PageBanner";
import { GameFairnessPage } from "./games/GameFairnessPage";
import { SvgArrowRight } from "@client/svgs/common/SvgArrowRight";
import { SvgDice } from "@client/svgs/common/SvgDice";
import { Vector } from "@client/comps/vector/Vector";
import { SvgLimbo } from "@client/svgs/common/SvgLimbo";
import { SvgCrash } from "@client/svgs/common/SvgCrash";
import { SvgBlackjack } from "@client/svgs/common/SvgBlackjack";
import { SvgMines } from "@client/svgs/common/SvgMines";
import { SvgDouble } from "#app/svgs/double/SvgDouble";
import { SvgBattle } from "@client/svgs/common/SvgBattle";
import { SvgCases } from "@client/svgs/common/SvgCases";

export const FairnessPage = () => {
  const { t } = useTranslation(["fairness"]);
  const small = useIsMobileLayout();

  return (
    <Fragment>
      <PageBanner
        image={`/graphics/fairness-tile`}
        heading={t(`title`)}
        description=""
        content={<></>}
      />
      <SitePage
        className="GamesPage"
        gap={small ? 32 : 56}
        pb={small ? 40 : 56}
        px={small ? 0 : 32}
        pt={small ? 0 : 56}
      >
        <Conditional
          value={small ? "true" : "false"}
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
        <FairnessMenu />
        <FairnessView />
      </Div>
    </Div>
  );
};

const MobileContent = () => {
  return (
    <Div
      fx
      column
    >
      <FairnessMenu />
      <Div
        fx
        px={20}
      >
        <FairnessView />
      </Div>
    </Div>
  );
};

const FairnessMenu = () => {
  const { t } = useTranslation(["fairness", "games"]);
  const layout = useAppSelector((x) => x.style.mainLayout);

  const items = [
    { label: t("overview.title"), to: "/fairness", end: true },
    { label: t("games:case_battles"), to: "/fairness/case-battles", icon: SvgBattle },
    { label: t("games:crash"), to: "/fairness/crash", icon: SvgCrash },
    { label: t("games:dice"), to: "/fairness/dice", icon: SvgDice },
    { label: t("games:limbo"), to: "/fairness/limbo", icon: SvgLimbo },
    { label: t("games:blackjack"), to: "/fairness/blackjack", icon: SvgBlackjack },
    { label: t("games:mines"), to: "/fairness/mines", icon: SvgMines },
    { label: t("games:cases"), to: "/fairness/cases", icon: SvgCases },
    { label: t("games:double"), to: "/fairness/double", icon: SvgDouble },
  ];

  return (
    <Conditional
      value={layout}
      mobile={<FairnessMenuMobile items={items} />}
      tablet={
        <FairnessMenuDesktop
          items={items}
          layout={layout}
        />
      }
      laptop={
        <FairnessMenuDesktop
          items={items}
          layout={layout}
        />
      }
      desktop={
        <FairnessMenuDesktop
          items={items}
          layout={layout}
        />
      }
    />
  );
};

const FairnessMenuMobile = ({ items }: { items: { label: string; to: string; icon?: Svg }[] }) => {
  const selectedOption = items.find((item) => item.to === window.location.pathname);
  if (!items || items.length === 0) return null;
  return (
    <Button
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
      onClick={() => Dialogs.open("primary", <AccountMenuModal items={items} />)}
    />
  );
};

const FairnessMenuDesktop = ({
  items,
  layout,
}: {
  items: { label: string; to: string; icon?: Svg }[];
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
        {items.map((item, i) => (
          <RouterLink
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
            {item.icon && <Vector as={item.icon} />}
            <Div column>
              <Span>{item.label}</Span>
            </Div>
          </RouterLink>
        ))}
      </Div>
    </Div>
  );
};

const FairnessView = () => {
  const small = useIsMobileLayout();
  return (
    <Div
      fx
      overflow="hidden"
      pt={small ? 24 : 0}
    >
      <Div
        fx
        column
        gap={small ? 32 : 56}
        alignItems="flex-start"
        position="relative"
        grow
      >
        <Routes>
          <Route
            index
            element={<InfoBody />}
          />
          <Route
            path="/cases/game"
            element={
              <GameFairnessPage
                game="cases"
                caseKind={`case`}
                verificationLink="https://onecompiler.com/nodejs/42xmm7gm3"
              />
            }
          />
          <Route
            path="/cases/gem"
            element={
              <GameFairnessPage
                game="cases"
                caseKind={`gem-case`}
                verificationLink="https://onecompiler.com/nodejs/42xmm7gm3"
              />
            }
          />
          <Route
            path="/cases/level"
            element={
              <GameFairnessPage
                game="cases"
                caseKind={`level-case`}
                verificationLink="https://onecompiler.com/nodejs/42xmm7gm3"
              />
            }
          />
          <Route
            path="/cases"
            element={
              <GameFairnessPage
                game="cases"
                caseKind={`case`}
                verificationLink="https://onecompiler.com/nodejs/42xmm7gm3"
              />
            }
          />
          <Route
            path="/case-battles"
            element={
              <GameFairnessPage
                game="case-battles"
                verificationLink="https://onecompiler.com/nodejs/42xmm7gm3"
              />
            }
          />
          <Route
            path="/double"
            element={
              <GameFairnessPage
                game="double"
                verificationLink="https://onecompiler.com/nodejs/43qambqeh"
              />
            }
          />
          <Route
            path="/dice"
            element={
              <GameFairnessPage
                game="dice"
                verificationLink="https://onecompiler.com/nodejs/43payptg5"
              />
            }
          />
          <Route
            path="/limbo"
            element={
              <GameFairnessPage
                game="limbo"
                verificationLink="https://onecompiler.com/nodejs/43qadynn9"
              />
            }
          />
          <Route
            path="/mines"
            element={
              <GameFairnessPage
                game="mines"
                verificationLink="https://onecompiler.com/nodejs/43qarqvnf"
              />
            }
          />
          <Route
            path="/blackjack"
            element={
              <GameFairnessPage
                game="blackjack"
                verificationLink="https://onecompiler.com/nodejs/43qasp2qf"
              />
            }
          />
          <Route
            path="/crash"
            element={
              <GameFairnessPage
                game="crash"
                verificationLink="https://onecompiler.com/nodejs/43qabhema"
              />
            }
          />
          <Route
            path="*"
            element={
              <Navigate
                replace
                to="/fairness"
              />
            }
          />
        </Routes>
      </Div>
    </Div>
  );
};
