import { Routes, Route } from "react-router-dom";
import { ChestEditorPage } from "./ChestEditorPage";
import { ChestIndexPage } from "./ChestIndexPage";

export function ChestsRouter() {
  return (
    <Routes>
      <Route
        index
        element={<ChestIndexPage />}
      />
      <Route
        path="/:action/:chestId?"
        element={<ChestEditorPage />}
      />
    </Routes>
  );
}
