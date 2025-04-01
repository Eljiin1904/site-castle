import { ConfirmModal } from "@client/modals/confirm/ConfirmModal";
import { Toasts } from "@client/services/toasts";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Security } from "#app/services/security";
import { Users } from "#app/services/users";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const UserLogoutModal = () => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  return (
    <ConfirmModal
      heading={t('signout.title')}
      message={t('signout.description')}
      onConfirm={async () => {
        await Security.logout();
        dispatch(Users.resetUser());
        Toasts.success('signout.success');
      }}
    />
  );
};
