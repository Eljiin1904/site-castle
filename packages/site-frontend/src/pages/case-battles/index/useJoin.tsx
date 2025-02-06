import { useNavigate } from "react-router-dom";
import { CaseBattleDocument } from "@core/types/case-battles/CaseBattleDocument";
import { usePost } from "@client/hooks/system/usePost";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { CaseBattles } from "#app/services/case-battles";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LoginModal } from "#app/modals/login/LoginModal";
import { UserEmailConfirmModal } from "#app/modals/user/UserEmailConfirmModal";
import { useBet2fa } from "#app/hooks/security/useBet2fa";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { VerificationModal } from "#app/modals/verification/VerificationModal";

export function useJoin() {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const userId = useAppSelector((x) => x.user._id);
  const emailConfirmed = useAppSelector((x) => x.user.emailConfirmed);
  const kycTier = useAppSelector((x) => x.user.kyc.tier);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const bet2fa = useBet2fa();

  const handleJoin = usePost(
    async (isMounted, battle: CaseBattleDocument, seat: number) => {
      const battleId = battle._id;

      if (CaseBattles.includesUser(battle, userId)) {
        throw new Error("You are already in that battle.");
      }
      if (!authenticated) {
        return Dialogs.open("primary", <LoginModal />);
      }
      if (!emailConfirmed) {
        return Dialogs.open("primary", <UserEmailConfirmModal />);
      }
      if (kycTier < 1) {
        return Dialogs.open("primary", <VerificationModal />);
      }

      const betToken = await bet2fa();

      await CaseBattles.joinBattle({ battleId, seat, betToken });

      navigate(`/case-battles/${battleId}`);

      Toasts.success("You joined battle.");
    },
    (x) => dispatch(CaseBattles.setPlayerProcessing(x)),
  );

  return handleJoin;
}
