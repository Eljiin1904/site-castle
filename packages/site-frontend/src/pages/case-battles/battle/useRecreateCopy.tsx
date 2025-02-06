import { useNavigate } from "react-router-dom";
import { usePost } from "@client/hooks/system/usePost";
import { Dialogs } from "@client/services/dialogs";
import { CaseBattles } from "#app/services/case-battles";
import { LoginModal } from "#app/modals/login/LoginModal";
import { UserEmailConfirmModal } from "#app/modals/user/UserEmailConfirmModal";
import { store } from "#app/store";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { VerificationModal } from "#app/modals/verification/VerificationModal";

export function useRecreateCopy() {
  const kycTier = useAppSelector((x) => x.user.kyc.tier);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleCopy = usePost(async () => {
    const { battlePlayer, user } = store.getState();
    const { authenticated, emailConfirmed } = user;

    if (!authenticated) {
      return Dialogs.open("primary", <LoginModal />);
    }
    if (!emailConfirmed) {
      return Dialogs.open("primary", <UserEmailConfirmModal />);
    }
    if (kycTier < 1) {
      return Dialogs.open("primary", <VerificationModal />);
    }

    dispatch(CaseBattles.copyBattle(battlePlayer));

    navigate(`/case-battles/create`);
  });

  return handleCopy;
}
