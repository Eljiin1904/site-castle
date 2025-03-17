import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Dialogs } from "@client/services/dialogs";
import { LoginModal } from "#app/modals/login/LoginModal";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { LanguageSelector } from "./LanguageSelector";

export const HeaderGuest = () => {
  const small = useIsMobileLayout();
  const {t, i18n} = useTranslation();
  return (
    <Div gap={16}>
      <LanguageSelector />
      <Button
        kind="secondary-yellow"
        size={small ? "sm" : "md"}
        label={t("menu.login")}
        style={{
          minWidth: small ? "75px" : "90px",
        }}
        onClick={() => Dialogs.open("primary", <LoginModal initialAction="login" />)}
      />
      <Button
        kind="primary-yellow"
        size={small ? "sm" : "md"}
        label={t("menu.register")}
        style={{
          minWidth: small ? "75px" : "90px",
        }}
        onClick={() => Dialogs.open("primary", <LoginModal initialAction="register" />)}
      />
    </Div>
  );
};
