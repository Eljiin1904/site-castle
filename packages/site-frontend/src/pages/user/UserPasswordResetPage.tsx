import { useNavigate, useParams } from "react-router-dom";
import { PageNotice } from "@client/comps/page/PageNotice";
import { useMount } from "@client/hooks/system/useMount";
import { Dialogs } from "@client/services/dialogs";
import { SitePage } from "#app/comps/site-page/SitePage";
import { UserResetPasswordModal } from "#app/modals/user/UserPasswordResetModal";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { SvgLock } from "#app/svgs/common/SvgLock";

export const UserPasswordResetPage = () => {
  const { recoverToken } = useParams<{ recoverToken?: string }>();
  const small = useIsMobileLayout();
  const navigate = useNavigate();
  const {t} = useTranslation();

  useMount(() => {
    if (!recoverToken) {
      navigate("/");
    } else {
      Dialogs.open(
        "primary",
        <UserResetPasswordModal recoverToken={recoverToken} />,
      );
    }
  });

  return (
    <SitePage>
      <PageNotice
        icon={SvgLock}
        title={t("reset.title")}
        titleSize={small ? 20 : 24}
        message={t("reset.description")}
        buttonLabel={t("reset.title")}
        onButtonClick={() =>
          Dialogs.open(
            "primary",
            <UserResetPasswordModal recoverToken={recoverToken!} />,
          )
        }
      />
    </SitePage>
  );
};
