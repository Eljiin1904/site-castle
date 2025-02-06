import { Routes, Route } from "react-router-dom";
import { CaseIndexPage } from "./CaseIndexPage";
import { CasePlayerPage } from "./CasePlayerPage";

export const CasesRouter = () => {
  return (
    <Routes>
      <Route
        index
        element={<CaseIndexPage />}
      />
      <Route
        path="/:slug"
        element={<CasePlayerPage />}
      />
    </Routes>
  );
};
