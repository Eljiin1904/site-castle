import { useNavigate, useParams } from "react-router-dom";
import { useMount } from "@client/hooks/system/useMount";
import { Toasts } from "@client/services/toasts";
import { SitePage } from "#app/comps/site-page/SitePage";
import { Users } from "#app/services/users";

export const UserExclusionConfirmPage = () => {
  const { confirmToken } = useParams<{ confirmToken?: string }>();
  const navigate = useNavigate();

  useMount(async () => {
    if (!confirmToken) {
      navigate("/");
    } else {
      await Users.confirmExclusion({ confirmToken });
      Toasts.success("Exclusion confirmed.");
      navigate("/account");
    }
  });

  return <SitePage />;
};
