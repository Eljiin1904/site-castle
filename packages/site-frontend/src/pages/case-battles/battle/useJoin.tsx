import { usePost } from "@client/hooks/system/usePost";
import { Toasts } from "@client/services/toasts";
import { Dialogs } from "@client/services/dialogs";
import { CaseBattles } from "#app/services/case-battles";
import { useBet2fa } from "#app/hooks/security/useBet2fa";
import { LoginModal } from "#app/modals/login/LoginModal";
import { UserEmailConfirmModal } from "#app/modals/user/UserEmailConfirmModal";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { VerificationModal } from "#app/modals/verification/VerificationModal";
import { store } from "#app/store";

export function useJoin() {
  const kycTier = useAppSelector((x) => x.user.kyc.tier);
  const bet2fa = useBet2fa();
  const dispatch = useAppDispatch();

  const handleJoin = usePost(
    async (isMounted, seat: number) => {
      const { battlePlayer, user } = store.getState();
      const { authenticated, emailConfirmed, tokenBalance } = user;
      const { _id: battleId, entryCost } = battlePlayer;

      if (!authenticated) {
        return Dialogs.open("primary", <LoginModal />);
      }
      if (!emailConfirmed) {
        return Dialogs.open("primary", <UserEmailConfirmModal />);
      }
      if (kycTier < 1) {
        return Dialogs.open("primary", <VerificationModal />);
      }
      if (entryCost > tokenBalance) {
        throw new Error("You do not have enough tokens.");
      }

      const betToken = await bet2fa();

      await CaseBattles.joinBattle({ battleId, seat, betToken });

      Toasts.success("You joined battle.");
    },
    (x) => dispatch(CaseBattles.setPlayerProcessing(x)),
  );

  return handleJoin;
}
