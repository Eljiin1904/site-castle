import { Routes, Route, Navigate } from "react-router-dom";
import { MarketDepositPage } from "./MarketDepositPage";
import { MarketWithdrawPage } from "./MarketWithdrawPage";

export const MarketRouter = () => {
  return (
    <Routes>
      <Route
        index
        element={<MarketWithdrawPage />}
      />
      <Route
        path="/deposit"
        element={<MarketDepositPage />}
      />
      <Route
        path="*"
        element={
          <Navigate
            replace
            to="/marketplace"
          />
        }
      />
    </Routes>
  );
};
