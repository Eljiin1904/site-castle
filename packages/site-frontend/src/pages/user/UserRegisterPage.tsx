import { Navigate } from "react-router-dom";
import { useMount } from "@client/hooks/system/useMount";
import { Dialogs } from "@client/services/dialogs";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LoginModal } from "#app/modals/login/LoginModal";

export function UserRegisterPage() {
  const authenticated = useAppSelector((x) => x.user.authenticated);

  useMount(() => {
    if (!authenticated) {
      Dialogs.open("primary", <LoginModal initialAction="register" />);
    }
  });

  return (
    <Navigate
      replace
      to="/"
    />
  );
}
