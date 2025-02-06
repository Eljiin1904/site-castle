import { Routes, Route } from "react-router-dom";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { HolidayPage } from "./HolidayPage";
import { HolidayCasePage } from "./HolidayCasePage";

export const HolidayRouter = () => {
  const holiday = useAppSelector((x) => x.site.meta.holiday);

  if (!holiday) {
    return null;
  }
  return (
    <Routes>
      <Route
        path="/cases/:slug"
        element={<HolidayCasePage />}
      />
      <Route
        path="*"
        element={<HolidayPage />}
      />
    </Routes>
  );
};
