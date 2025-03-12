import { ConfirmModal } from "@client/modals/confirm/ConfirmModal";
import { Toasts } from "@client/services/toasts";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Admin } from "#app/services/admin";
import { Security } from "#app/services/security";

export const AdminLogoutModal = () => {
  const dispatch = useAppDispatch();

  return (
    <ConfirmModal
      heading="Log Out"
      message="Are you sure you want to log out?"
      onConfirm={async () => {
        await Security.logout();
        dispatch(Admin.logoutAdmin());
        Toasts.success("You signed out.");
      }}
    />
  );
};
