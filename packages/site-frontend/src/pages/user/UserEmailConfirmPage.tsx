import { useNavigate, useParams } from "react-router-dom";
import { useMount } from "@client/hooks/system/useMount";
import { Toasts } from "@client/services/toasts";
import { PageNotice } from "@client/comps/page/PageNotice";
import { Dialogs } from "@client/services/dialogs";
import { SitePage } from "#app/comps/site-page/SitePage";
import { Users } from "#app/services/users";
import { UserEmailConfirmModal } from "#app/modals/user/UserEmailConfirmModal";

export const UserEmailConfirmPage = () => {
  const { confirmToken } = useParams<{ confirmToken?: string }>();
  const navigate = useNavigate();

  useMount(async () => {
    if (!confirmToken) {
      navigate("/");
    } else {
      await Users.confirmEmail({ confirmToken });
      Toasts.success("Email confirmed.");
      navigate("/account");
    }
  });

  return (
    <SitePage>
      <PageNotice
        image="/graphics/notice-chicken-login"
        title="Confirm Email"
        message="To confirm your email, please click the button below."
        buttonLabel="Confirm Email"
        onButtonClick={() =>
          Dialogs.open("primary", <UserEmailConfirmModal confirmToken={confirmToken} />)
        }
      />
    </SitePage>
  );
};
