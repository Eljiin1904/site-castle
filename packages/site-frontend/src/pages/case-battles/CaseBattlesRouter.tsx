import { Routes, Route } from "react-router-dom";
import { CaseBattleIndexPage } from "./CaseBattleIndexPage";
import { CaseBattleCreatePage } from "./CaseBattleCreatePage";
import { CaseBattlePlayerPage } from "./CaseBattlePlayerPage";

export const CaseBattlesRouter = () => {
  return (
    <Routes>
      <Route
        index
        element={<CaseBattleIndexPage />}
      />
      <Route
        path="/create"
        element={<CaseBattleCreatePage />}
      />
      <Route
        path="/:battleId"
        element={<CaseBattlePlayerPage />}
      />
    </Routes>
  );
};
