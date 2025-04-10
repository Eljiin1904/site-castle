import { Routes, Route } from "react-router-dom";
import { OriginalGamesPage } from "./OriginalGamesPage";

export const GamesRoute = () => {
  return (
    <Routes>
      <Route
        index
        element={<OriginalGamesPage />}
      />
      <Route
        path="/original-games"
        element={<OriginalGamesPage />}
      />
    </Routes>
  );
};
