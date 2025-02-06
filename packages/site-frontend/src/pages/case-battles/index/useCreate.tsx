import { useEventCallback } from "usehooks-ts";
import { useNavigate } from "react-router-dom";
import { Dialogs } from "@client/services/dialogs";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LoginModal } from "#app/modals/login/LoginModal";
import { UserEmailConfirmModal } from "#app/modals/user/UserEmailConfirmModal";
import { VerificationModal } from "#app/modals/verification/VerificationModal";

export function useCreate() {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const emailConfirmed = useAppSelector((x) => x.user.emailConfirmed);
  const kycTier = useAppSelector((x) => x.user.kyc.tier);
  const navigate = useNavigate();

  const handleCreate = useEventCallback(() => {
    if (!authenticated) {
      return Dialogs.open("primary", <LoginModal />);
    }
    if (!emailConfirmed) {
      return Dialogs.open("primary", <UserEmailConfirmModal />);
    }
    if (kycTier < 1) {
      return Dialogs.open("primary", <VerificationModal />);
    }

    navigate("/case-battles/create");
  });

  return handleCreate;
}
