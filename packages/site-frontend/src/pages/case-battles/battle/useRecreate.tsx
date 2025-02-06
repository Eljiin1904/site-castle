import { useNavigate } from "react-router-dom";
import { usePost } from "@client/hooks/system/usePost";
import { Toasts } from "@client/services/toasts";
import { Dialogs } from "@client/services/dialogs";
import { Utility } from "@client/services/utility";
import { CaseBattles } from "#app/services/case-battles";
import { useBet2fa } from "#app/hooks/security/useBet2fa";
import { LoginModal } from "#app/modals/login/LoginModal";
import { UserEmailConfirmModal } from "#app/modals/user/UserEmailConfirmModal";
import { store } from "#app/store";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { VerificationModal } from "#app/modals/verification/VerificationModal";

export function useRecreate() {
  const kycTier = useAppSelector((x) => x.user.kyc.tier);
  const bet2fa = useBet2fa();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleRecreate = usePost(
    async () => {
      const { battlePlayer, user } = store.getState();
      const { authenticated, emailConfirmed, tokenBalance } = user;
      const { entryCost, mode, modifiers, chests } = battlePlayer;

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

      const { battleId } = await CaseBattles.createBattle({
        mode,
        chests: chests.map((x) => ({ id: x._id, count: x.count })),
        modifiers,
        betToken,
      });

      Toasts.success("Battle recreated.");

      navigate(`/case-battles/${battleId}`);

      // prevent spamming while navigating
      await Utility.wait(2000);
    },
    (x) => dispatch(CaseBattles.setPlayerProcessing(x)),
  );

  return handleRecreate;
}
