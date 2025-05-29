import { Routes, Route, Navigate, useLocation, useSearchParams } from "react-router-dom";
import { AuthReturnPage } from "#app/pages/security/AuthReturnPage";
import { HomePage } from "#app/pages/home/HomePage";
import { NotFoundPage } from "#app/pages/not-found/NotFoundPage";
import { UserPasswordResetPage } from "#app/pages/user/UserPasswordResetPage";
import { CasesRouter } from "#app/pages/cases/CasesRouter";
import { CaseBattlesRouter } from "#app/pages/case-battles/CaseBattlesRouter";
import { DicePage } from "#app/pages/dice/DicePage";
import { DoublePage } from "#app/pages/double/DoublePage";
import { LimboPage } from "#app/pages/limbo/LimboPage";
import { MinesPage } from "#app/pages/mines/MinesPage";
import { AboutPage } from "#app/pages/about/AboutPage";
import { AccountPage } from "#app/pages/account/AccountPage";
import { UserEmailConfirmPage } from "#app/pages/user/UserEmailConfirmPage";
import { UserSelfExcludePage } from "#app/pages/user/UserSelfExcludePage";
import { UserExclusionConfirmPage } from "#app/pages/user/UserExclusionConfirmPage";
import { UserExclusionExtendPage } from "#app/pages/user/UserExclusionExtendPage";
import { UserReferralPage } from "#app/pages/user/UserReferralPage";
import { UserRegisterPage } from "#app/pages/user/UserRegisterPage";
import { UserLoginPage } from "#app/pages/user/UserLoginPage";
import { AffiliatePage } from "#app/pages/affiliate/AffiliatePage";
import { RewardsPage } from "#app/pages/rewards/RewardsPage";
import { UserRedeemPage } from "#app/pages/user/UserRedeemPage";
import { GemCasePage } from "#app/pages/rewards/GemCasePage";
import { LevelCasePage } from "#app/pages/rewards/LevelCasePage";
import { FairnessPage } from "#app/pages/fairness/FairnessPage";
import { MarketRouter } from "#app/pages/market/MarketRouter";
import { RacePage } from "#app/pages/race/RacePage";
import { HolidayRouter } from "#app/pages/holiday/HolidayRouter";
import { BetsPage } from "#app/pages/bets/BetsPage";
import { GamesRoute } from "#app/pages/games/GamesRouter";
import { GamesByCategoryPage } from "#app/pages/games/GamesByCategoryPage";
import { OriginalGamesPage } from "#app/pages/games/OriginalGamesPage";
import { ReferralsPage } from "#app/pages/referrals/ReferralsPage";
import { BlackjackPage } from "#app/pages/blackjack/BlackjackPage";
import { CrashPage } from "#app/pages/crash/CrashPage";

export const AppRouter = () => {
  const { pathname } = useLocation();
  const [params] = useSearchParams();

  if (params.has("p")) {
    localStorage.setItem("referral-code", JSON.stringify(`p_${params.get("p")}`));
    return (
      <Navigate
        replace
        to={pathname}
      />
    );
  }
  return (
    <Routes>
      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/r/:referer?"
        element={<UserReferralPage />}
      />
      <Route
        path="/register"
        element={<UserRegisterPage />}
      />
      <Route
        path="/login"
        element={<UserLoginPage />}
      />
      <Route
        path="/featured"
        element={<OriginalGamesPage />}
      />
      <Route
        path="/original"
        element={<OriginalGamesPage />}
      />
      <Route
        path="/slots"
        element={<GamesByCategoryPage category="slots" />}
      />
      <Route
        path="/live-casino"
        element={<GamesByCategoryPage category="live_casino" />}
      />
      <Route
        path="/game-shows"
        element={<GamesByCategoryPage category="game_shows" />}
      />
      <Route
        path="/games/*"
        element={<GamesRoute />}
      />

      <Route
        path="/auth/:provider"
        element={<AuthReturnPage />}
      />
      <Route
        path="/confirm-email/:confirmToken?"
        element={<UserEmailConfirmPage />}
      />
      <Route
        path="/confirm-exclusion/:confirmToken?"
        element={<UserExclusionConfirmPage />}
      />
      <Route
        path="/self-exclude"
        element={<UserSelfExcludePage />}
      />
      <Route
        path="/extend-exclusion"
        element={<UserExclusionExtendPage />}
      />
      <Route
        path="/reset-password/:recoverToken?"
        element={<UserPasswordResetPage />}
      />
      <Route
        path="/redeem"
        element={<UserRedeemPage />}
      />

      <Route
        path="/about/*"
        element={<AboutPage />}
      />
      <Route
        path="/privacy-policy"
        element={
          <Navigate
            replace
            to="/about/privacy-policy"
          />
        }
      />
      <Route
        path="/terms-of-service"
        element={
          <Navigate
            replace
            to="/about/terms-of-service"
          />
        }
      />

      <Route
        path="/account/*"
        element={<AccountPage />}
      />
      <Route
        path="/affiliate/*"
        element={<AffiliatePage />}
      />

      <Route
        path="/rewards/gem-cases/:slug"
        element={<GemCasePage />}
      />
      <Route
        path="/rewards/level-cases/:slug"
        element={<LevelCasePage />}
      />
      <Route
        path="/rewards/*"
        element={<RewardsPage />}
      />

      <Route
        path="/referrals/*"
        element={<ReferralsPage />}
      />

      <Route
        path="/cases/*"
        element={<CasesRouter />}
      />
      <Route
        path="/case-battles/*"
        element={<CaseBattlesRouter />}
      />
      <Route
        path="/double"
        element={<DoublePage />}
      />
      <Route
        path="/dice"
        element={<DicePage />}
      />
       <Route
        path="/crash"
        element={<CrashPage />}
      />
      <Route
        path="/limbo"
        element={<LimboPage />}
      />
      <Route
        path="/mines"
        element={<MinesPage />}
      />
      <Route
        path="/blackjack"
        element={<BlackjackPage />}
      />
      <Route
        path="/fairness/*"
        element={<FairnessPage />}
      />
      <Route
        path="/bets"
        element={<BetsPage />}
      />
      <Route
        path="/marketplace/*"
        element={<MarketRouter />}
      />
      <Route
        path="/race"
        element={<RacePage />}
      />
      <Route
        path="/holiday/*"
        element={<HolidayRouter />}
      />

      <Route
        path="/*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
};
