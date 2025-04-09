import { Routes, Route } from "react-router-dom";
import { OriginalGamesPage } from "./OriginalGamesPage";
import { GamesByCategoryPage } from "./GamesByCategoryPage";

export const GamesRoute = () => {
  return (
    <Routes>
      <Route
        index
        element={<OriginalGamesPage />}
      />
      <Route
        path="/original"
        element={<OriginalGamesPage />}
      />
      <Route
        path="/slots"
        element={<GamesByCategoryPage category="slots" />}
      />
      <Route
        path="/live_casino"
        element={<GamesByCategoryPage category="live_casino" />}
      />
      <Route
        path="/game_shows"
        element={<GamesByCategoryPage category="game_shows" />}
      />
    </Routes>
  );
};
