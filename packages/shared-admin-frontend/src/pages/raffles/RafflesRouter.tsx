import { Routes, Route } from "react-router-dom";
import { RafflesCreatePage } from "./RafflesCreatePage";
import { RafflesIndexPage } from "./RafflesIndexPage";
import { RafflesInfoPage } from "./RafflesInfoPage";

export function RafflesRouter() {
  return (
    <Routes>
      <Route
        index
        element={<RafflesIndexPage />}
      />
      <Route
        path="/create"
        element={<RafflesCreatePage />}
      />
      <Route
        path="/:raffleId"
        element={<RafflesInfoPage />}
      />
    </Routes>
  );
}
