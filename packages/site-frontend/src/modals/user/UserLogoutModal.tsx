import { ConfirmModal } from "@client/modals/confirm/ConfirmModal";
import { Toasts } from "@client/services/toasts";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Security } from "#app/services/security";
import { Users } from "#app/services/users";

export const UserLogoutModal = () => {
  const dispatch = useAppDispatch();

  return (
    <ConfirmModal
      heading="Sign Out"
      message="Are you sure you want to sign out?"
      onConfirm={async () => {
        await Security.logout();
        dispatch(Users.resetUser());
        Toasts.success("You signed out.");
      }}
    />
  );
};
