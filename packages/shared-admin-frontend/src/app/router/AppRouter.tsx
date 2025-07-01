import { Routes, Route, Navigate } from "react-router-dom";
import { DashboardPage } from "#app/pages/dashboard/DashboardPage";
import { ChestsRouter } from "#app/pages/chests/ChestsRouter";
import { LogPage } from "#app/pages/log/LogPage";
import { RacesPage } from "#app/pages/races/RacesPage";
import { GiftCardsPage } from "#app/pages/gift-cards/GiftCardsPage";
import { NotFoundPage } from "#app/pages/not-found/NotFoundPage";
import { PromotionsPage } from "#app/pages/promotions/PromotionsPage";
import { SettingsPage } from "#app/pages/settings/SettingsPage";
import { TransactionsPage } from "#app/pages/transactions/TransactionsPage";
import { UsersRouter } from "#app/pages/users/UsersRouter";
import { AffiliatesPage } from "#app/pages/affiliates/AffiliatesPage";
import { ReloadsPage } from "#app/pages/reloads/ReloadsPage";
import { CryptoPage } from "#app/pages/crypto/CryptoPage";
import { BoostsPage } from "#app/pages/boosts/BoostsPage";
import { GemStorePage } from "#app/pages/gem-store/GemStorePage";
import { DevPage } from "#app/pages/dev/DevPage";
import { RafflesRouter } from "#app/pages/raffles/RafflesRouter";
import { HolidayRouter } from "#app/pages/holiday/HolidayRouter";
import { SkinsPage } from "#app/pages/skins/SkinsPage";
import { HubEightIndexPage } from "../../pages/hub-eight/HubEightIndexPage";

export function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Navigate
            replace
            to="/dashboard"
          />
        }
      />
      <Route
        path="/dashboard/*"
        element={<DashboardPage />}
      />
      <Route
        path="/settings"
        element={<SettingsPage />}
      />
      <Route
        path="/users/*"
        element={<UsersRouter />}
      />
      <Route
        path="/affiliates/*"
        element={<AffiliatesPage />}
      />
      <Route
        path="/reloads"
        element={<ReloadsPage />}
      />
      <Route
        path="/transactions"
        element={<TransactionsPage />}
      />
      <Route
        path="/crypto"
        element={<CryptoPage />}
      />

      <Route
        path="/skins"
        element={<SkinsPage />}
      />
      <Route
        path="/races"
        element={<RacesPage />}
      />
      <Route
        path="/raffles/*"
        element={<RafflesRouter />}
      />
      <Route
        path="/gift-cards"
        element={<GiftCardsPage />}
      />
      <Route
        path="/boosts"
        element={<BoostsPage />}
      />
      <Route
        path="/gems"
        element={<GemStorePage />}
      />
      <Route
        path="/promotions"
        element={<PromotionsPage />}
      />
      <Route
        path="/chests/*"
        element={<ChestsRouter />}
      />
      <Route
        path="/holidays/*"
        element={<HolidayRouter />}
      />
      <Route
        path="/hub-eight"
        element={<HubEightIndexPage />}
      />
      <Route
        path="/logs/*"
        element={<LogPage />}
      />
      <Route
        path="/dev"
        element={<DevPage />}
      />
      <Route
        path="/*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}
