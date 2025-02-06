import { PageNotice } from "@client/comps/page/PageNotice";
import { Dialogs } from "@client/services/dialogs";
import { LoginModal } from "#app/modals/login/LoginModal";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { ClaimsContent } from "./ClaimsContent";

export const ClaimsBody = () => {
  const authenticated = useAppSelector((x) => x.user.authenticated);

  if (authenticated) {
    return <ClaimsContent />;
  } else {
    return (
      <PageNotice
        image="/graphics/notice-chicken-login"
        title="Login Required"
        message="Please login to view this content."
        buttonLabel="Login"
        onButtonClick={() => Dialogs.open("primary", <LoginModal />)}
      />
    );
  }
};
