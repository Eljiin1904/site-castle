import { FC, useEffect } from "react";
import { PageProps, Page } from "@client/comps/page/Page";
import { PageNotice } from "@client/comps/page/PageNotice";
import { Dialogs } from "@client/services/dialogs";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Site } from "#app/services/site";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LoginModal } from "#app/modals/login/LoginModal";

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

  useEffect(() => {
    dispatch(Site.setTitle(title));
  }, [title]);

  let bodyContent;
  console.log("SitePage", { privileged, authenticated });
  if (privileged && !authenticated) {
    bodyContent = (
      <PageNotice
        image="/graphics/notice-chicken-login"
        title="Login Required"
        message="Please login to view this content."
        buttonLabel="Login"
        onButtonClick={() => Dialogs.open("primary", <LoginModal />)}
      />
    );
  } else {
    bodyContent = children;
  }

  return <Page {...forwardProps}>{bodyContent}</Page>;
};
