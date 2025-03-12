import { FC, useEffect } from "react";
import { PageProps, Page } from "@client/comps/page/Page";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Site } from "#app/services/site";

export type SitePageProps = PageProps & {
  title: string;
};

export const SitePage: FC<SitePageProps> = ({ title, ...forwardProps }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(Site.setTitle(title));
  }, [title]);

  return <Page {...forwardProps} />;
};
