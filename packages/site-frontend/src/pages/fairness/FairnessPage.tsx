import { Routes, Route, Navigate } from "react-router-dom";
import { PageNav } from "@client/comps/page/PageNav";
import { PageTitle } from "@client/comps/page/PageTitle";
import { SvgCheckCircle } from "@client/svgs/common/SvgCheckCircle";
import { SitePage } from "#app/comps/site-page/SitePage";
import { InfoBody } from "./info/InfoBody";
import { CasesBody } from "./cases/CasesBody";
import { CaseBattlesBody } from "./case-battles/CaseBattlesBody";
import { DoubleBody } from "./double/DoubleBody";
import { DiceBody } from "./dice/DiceBody";
import { LimboBody } from "./limbo/LimboBody";

export const FairnessPage = () => {
  return (
    <SitePage
      className="FairnessPage"
      title="Fairness"
    >
      <PageTitle
        icon={SvgCheckCircle}
        heading="Fairness"
      />
      <PageNav
        items={[
          { label: "Info", to: "/fairness", end: true },
          { label: "Cases", to: "/fairness/cases" },
          { label: "Battles", to: "/fairness/case-battles" },
          { label: "Double", to: "/fairness/double" },
          { label: "Dice", to: "/fairness/dice" },
          { label: "Limbo", to: "/fairness/limbo" },
        ]}
      />
      <Routes>
        <Route
          index
          element={<InfoBody />}
        />
        <Route
          path="/cases/game"
          element={<CasesBody kind="case" />}
        />
        <Route
          path="/cases/gem"
          element={<CasesBody kind="gem-case" />}
        />
        <Route
          path="/cases/level"
          element={<CasesBody kind="level-case" />}
        />
        <Route
          path="/cases"
          element={<CasesBody kind="case" />}
        />
        <Route
          path="/case-battles"
          element={<CaseBattlesBody />}
        />
        <Route
          path="/double"
          element={<DoubleBody />}
        />
        <Route
          path="/dice"
          element={<DiceBody />}
        />
        <Route
          path="/limbo"
          element={<LimboBody />}
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
    </SitePage>
  );
};
