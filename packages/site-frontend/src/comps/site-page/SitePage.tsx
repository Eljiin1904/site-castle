import { FC, useEffect } from "react";
import { PageProps, Page } from "@client/comps/page/Page";
import { PageNotice } from "@client/comps/page/PageNotice";
import { Dialogs } from "@client/services/dialogs";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Site } from "#app/services/site";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LoginModal } from "#app/modals/login/LoginModal";
import { useTranslation } from "@core/services/internationalization/internationalization";

export type SitePageProps = PageProps & {
  title?: string;
  privileged?: boolean;
};

export const SitePage: FC<SitePageProps> = ({
  title,
  privileged,
  children,
  ...forwardProps
}) => {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  useEffect(() => {
    dispatch(Site.setTitle(title));
  }, [title]);

  let bodyContent;
  
  if (privileged && !authenticated) {
    bodyContent = (
      <PageNotice
        image="/graphics/login-banner"
        title={t("signin.required")}
        message={t("signin.viewContent")}
        buttonLabel={t("signin.login")}
        onButtonClick={() => Dialogs.open("primary", <LoginModal />)}
      />
    );
  } else {
    bodyContent = children;
  }

  return <Page {...forwardProps}>{bodyContent}</Page>;
};
