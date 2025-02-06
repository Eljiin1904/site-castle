import { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PageLoading } from "@client/comps/page/PageLoading";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { HolidayHeader } from "./header/HolidayHeader";
import { StoreBody } from "./store/StoreBody";
import { AdventBody } from "./advent/AdventBody";
import { RaceBody } from "./race/RaceBody";
import { RaffleBody } from "./raffle/RaffleBody";
import { NoteGrid } from "./notes/NoteGrid";

export const HolidayContent = () => {
  const initialized = useAppSelector((x) => x.holiday.initialized);

  if (!initialized) {
    return <PageLoading />;
  } else {
    return (
      <Fragment>
        <HolidayHeader />
        <Routes>
          <Route
            path="/store"
            element={<StoreBody />}
          />
          <Route
            path="/advent"
            element={<AdventBody />}
          />
          <Route
            path="/raffles"
            element={<RaffleBody />}
          />
          <Route
            path="/races"
            element={<RaceBody />}
          />
          <Route
            path="*"
            element={
              <Navigate
                replace
                to="/holiday/store"
              />
            }
          />
        </Routes>
        <NoteGrid />
      </Fragment>
    );
  }
};
