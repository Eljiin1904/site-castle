import { Routes, Route } from "react-router-dom";
import { OriginalGamesPage } from "./OriginalGamesPage";
import { HubEightGames } from "./HubEightGames";
import { Game } from "./Game";

export const GamesRoute = () => {
  return (
    <Routes>
      <Route
        index
        element={<HubEightGames />}
      />
      <Route
        path="/original-games"
        element={<OriginalGamesPage />}
      />
      <Route
        path="/:gameId"
        element={<Game />}
      />
    </Routes>
  );
};
