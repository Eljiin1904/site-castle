import { useNavigate, useParams } from "react-router-dom";
import { useMount } from "@client/hooks/system/useMount";
import { Toasts } from "@client/services/toasts";
import { PageNotice } from "@client/comps/page/PageNotice";
import { Dialogs } from "@client/services/dialogs";
import { SitePage } from "#app/comps/site-page/SitePage";
import { Users } from "#app/services/users";
import { UserEmailConfirmModal } from "#app/modals/user/UserEmailConfirmModal";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const UserEmailConfirmPage = () => {
  const { confirmToken } = useParams<{ confirmToken?: string }>();
  const navigate = useNavigate();
  const {t} = useTranslation();

  useMount(async () => {
    if (!confirmToken) {
      navigate("/");
    } else {
      await Users.confirmEmail({ confirmToken });
      Toasts.success("register.confirm.success");
      navigate("/account");
    }
  });

  return (
    <SitePage>
      <PageNotice
        image="/graphics/notice-chicken-login"
        title={t("register.confirm.title")}
        message={t("register.confirm.description")}
        buttonLabel={t("register.confirm.title")}
        onButtonClick={() =>
          Dialogs.open(
            "primary",
            <UserEmailConfirmModal confirmToken={confirmToken} />,
          )
        }
      />
    </SitePage>
  );
};
