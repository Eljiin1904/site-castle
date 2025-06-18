import { PageNotice } from "@client/comps/page/PageNotice";
import { Dialogs } from "@client/services/dialogs";
import { LoginModal } from "#app/modals/login/LoginModal";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { ClaimsContent } from "./ClaimsContent";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const ClaimsBody = () => {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const {t} = useTranslation();
  if (authenticated) {
    return <ClaimsContent />;
  } else {
    return (
      <PageNotice
        image="/graphics/login-banner"
        title={t("signin.required")}
        message={t("signin.viewContent")}
        buttonLabel={t("signin.login")}
        onButtonClick={() => Dialogs.open("primary", <LoginModal />)}
      />
    );
  }
};
