import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Strings } from "@core/services/strings";
import { UserLinkProvider } from "@core/types/users/UserLinkProvider";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Span } from "@client/comps/span/Span";
import { Spinner } from "@client/comps/spinner/Spinner";
import { useMount } from "@client/hooks/system/useMount";
import { Dialogs } from "@client/services/dialogs";
import { SvgExternal } from "@client/svgs/common/SvgExternal";
import { Utility } from "@client/services/utility";
import {
  useAuthStatus,
  useAuthRedirect,
  useAuthSearch,
} from "#app/hooks/security/useAuthState";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import config from "#app/config";
import { SocialAuthFinalizeModal } from "./SocialAuthFinalizeModal";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Heading } from "@client/comps/heading/Heading";

export const SocialAuthStartModal = ({
  provider,
}: {
  provider: UserLinkProvider;
}) => {
  
  const small = useIsMobileLayout();
  const {t} = useTranslation();
  const [status, setStatus] = useAuthStatus();
  const [, setReturnTo, removeReturnTo] = useAuthRedirect();
  const [, , removeSearch] = useAuthSearch();
  const { pathname } = useLocation();
  const bodyLayout = useAppSelector((x) => x.style.bodyLayout);
  const label = Strings.capitalize(provider);
  
  const redirect = () => {
    setStatus("redirect");
    setReturnTo(pathname);
    window.open(`${config.apiURL}/auth/${provider}`, "_self");
  };

  const openPopup = () => {
    setStatus("popup");
    removeSearch();
    removeReturnTo();

    Utility.popup({ url: `${config.apiURL}/auth/${provider}`, w: 500, h: 720 });
  };

  useMount(() => {
    if (bodyLayout === "mobile" || bodyLayout === "tablet") {
      redirect();
    } else {
      openPopup();
    }
  });

  useEffect(() => {
    if (status === "returned") {
      Dialogs.open("primary", <SocialAuthFinalizeModal provider={provider} />);
    }
  }, [status]);

  return (
    <Modal
      className="AuthStartModal"
      width="sm"
      disableBackdrop
    >
      <ModalHeader
        // heading={t("signin.social.login", { provider: label })}
        onCloseClick={() => Dialogs.close("primary")}
      />
      <Div fy>
        <Div
          className={`login-content`}
          column
          fx
        >
          <ModalBody textAlign="center" justifyContent={small? "center" : "flex-start"}>
            <Heading  as="h2"
              size={small ? 20 : 24}
              fontWeight="regular"
              textTransform="uppercase">{t("signin.social.login", { provider: label })}
            </Heading>
            <Spinner
              size={80}
              mt={32}
              mb={24}
            />
            <ModalLabel>
              {t("signin.social.popup", { provider: label})}
            </ModalLabel>
            <Div
              fx
              column
              center
              gap={16}          
            >
              <Span
                textAlign="center"
                color="sand"
              >
                {t("signin.social.noPopup", { provider: label})}
              </Span>
              <Button
                fx
                kind="primary-yellow"
                label={t("signin.social.redirect", { provider: label})}
                mt={4}
                icon={SvgExternal}
                onClick={redirect}
              />
            </Div>
          </ModalBody>
        </Div> 
      </Div>
    </Modal>
  );
};
