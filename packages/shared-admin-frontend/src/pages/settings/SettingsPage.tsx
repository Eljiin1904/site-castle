import { Fragment } from "react";
import { useQuery } from "@tanstack/react-query";
import { SiteSettingObject } from "@core/types/site/SiteSettingDocument";
import { Dialogs } from "@client/services/dialogs";
import { PageLoading } from "@client/comps/page/PageLoading";
import { Errors } from "@client/services/errors";
import { PageNotice } from "@client/comps/page/PageNotice";
import { SitePage } from "#app/comps/site-page/SitePage";
import { Site } from "#app/services/site";
import { SettingEditModal } from "#app/modals/setting-edit/SettingEditModal";
import { SettingsHeader } from "./SettingsHeader";
import { FieldGrid } from "./FieldGrid";

export const SettingsPage = () => {
  const query = useQuery({
    queryKey: [],
    queryFn: () => Site.getSettings(),
  });

  const documents = query.data?.settings || [];
  const settings = {} as SiteSettingObject;

  for (const document of documents) {
    (settings as any)[document._id] = document.value;
  }

  let bodyContent;

  if (query.error) {
    bodyContent = (
      <PageNotice
        image="/graphics/notice-Chicken-error"
        title="Error"
        message="Something went wrong, please refetch settings."
        buttonLabel="Refetch Settings"
        description={Errors.getMessage(query.error)}
        onButtonClick={query.refetch}
      />
    );
  } else if (query.isLoading) {
    bodyContent = <PageLoading />;
  } else {
    bodyContent = (
      <Fragment>
        <SettingsHeader
          isLoading={query.isFetching}
          onRefreshClick={query.refetch}
        />
        <FieldGrid
          settings={settings}
          onEdit={(data) =>
            Dialogs.open(
              "primary",
              <SettingEditModal
                {...data}
                onSuccess={query.refetch}
              />,
            )
          }
        />
      </Fragment>
    );
  }

  return (
    <SitePage
      className="SettingsPage"
      title="Settings"
    >
      {bodyContent}
    </SitePage>
  );
};
