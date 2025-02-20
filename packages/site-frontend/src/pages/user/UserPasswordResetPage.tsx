import { useNavigate, useParams } from "react-router-dom";
import { PageNotice } from "@client/comps/page/PageNotice";
import { useMount } from "@client/hooks/system/useMount";
import { Dialogs } from "@client/services/dialogs";
import { SitePage } from "#app/comps/site-page/SitePage";
import { UserResetPasswordModal } from "#app/modals/user/UserPasswordResetModal";

export const UserPasswordResetPage = () => {
  const { recoverToken } = useParams<{ recoverToken?: string }>();
  const navigate = useNavigate();

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
        image="/graphics/notice-chicken-login"
        title="Reset Password"
        message="To reset your password, please click the button below."
        buttonLabel="Reset Password"
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
