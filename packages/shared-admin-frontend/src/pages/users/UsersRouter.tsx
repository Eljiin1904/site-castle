import { Routes, Route } from "react-router-dom";
import { UserIndexPage } from "./UserIndexPage";
import { UserManagePage } from "./UserManagePage";

export function UsersRouter() {
  return (
    <Routes>
      <Route
        index
        element={<UserIndexPage />}
      />
      <Route
        path="/:userId/*"
        element={<UserManagePage />}
      />
    </Routes>
  );
}
