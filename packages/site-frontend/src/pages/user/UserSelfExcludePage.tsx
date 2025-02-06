import { Navigate } from "react-router-dom";
import { useMount } from "@client/hooks/system/useMount";
import { Dialogs } from "@client/services/dialogs";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { UserExclusionStartModal } from "#app/modals/user/UserExclusionStartModal";

export function UserSelfExcludePage() {
  const authenticated = useAppSelector((x) => x.user.authenticated);

  useMount(() => {
    if (authenticated) {
      Dialogs.open("primary", <UserExclusionStartModal />);
    }
  });

  return (
    <Navigate
      replace
      to="/account/settings"
    />
  );
}
