import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserLinkProvider } from "@core/types/users/UserLinkProvider";
import { useMount } from "@client/hooks/system/useMount";
import { Dialogs } from "@client/services/dialogs";
import { SitePage } from "#app/comps/site-page/SitePage";
import {
  useAuthStatus,
  useAuthRedirect,
  useAuthSearch,
} from "#app/hooks/security/useAuthState";
import { SocialAuthFinalizeModal } from "#app/modals/security/SocialAuthFinalizeModal";

export const AuthReturnPage = () => {
  const { provider } = useParams<{ provider: UserLinkProvider }>();
  const [status, setStatus] = useAuthStatus();
  const [returnTo] = useAuthRedirect();
  const [, setSearch] = useAuthSearch();
  const location = useLocation();
  const navigate = useNavigate();

  useMount(() => {
    if (!provider) {
      navigate("/");
      return;
    }

    if (window.location.href.startsWith("http://localhost")) {
      window.location.replace(
        window.location.href.replace("http://localhost", "http://127.0.0.1"),
      );
      return;
    }

    setStatus("returned");
    setSearch(location.search);

    if (status === "popup") {
      window.close();
    } else {
      navigate(returnTo);
      Dialogs.open("primary", <SocialAuthFinalizeModal provider={provider} />);
    }
  });

  return <SitePage className="AuthReturnPage" />;
};
