import { Navigate, Route, Routes } from "react-router-dom";
import { PageNav } from "@client/comps/page/PageNav";
import { SitePage } from "#app/comps/site-page/SitePage";
import { AdminBody } from "./admin/AdminBody";
import { SystemBody } from "./system/SystemBody";

export const LogPage = () => {
  return (
    <SitePage
      className="LogPage"
      title="Logs"
    >
      <PageNav
        items={[
          { label: "Admin", to: "/logs", end: true },
          { label: "System", to: "/logs/system" },
        ]}
      />
      <Routes>
        <Route
          index
          element={<AdminBody />}
        />
        <Route
          path="/system"
          element={<SystemBody />}
        />
        <Route
          path="*"
          element={
            <Navigate
              replace
              to="/logs"
            />
          }
        />
      </Routes>
    </SitePage>
  );
};
