import { Routes, Route } from "react-router-dom";
import { HolidayIndexPage } from "./HolidayIndexPage";
import { HolidayCreatePage } from "./HolidayCreatePage";
import { HolidayInfoPage } from "./HolidayInfoPage";

export function HolidayRouter() {
  return (
    <Routes>
      <Route
        index
        element={<HolidayIndexPage />}
      />
      <Route
        path="/create"
        element={<HolidayCreatePage />}
      />
      <Route
        path="/:holidayId"
        element={<HolidayInfoPage />}
      />
    </Routes>
  );
}
