import { useMount } from "@client/hooks/system/useMount";
import { Dialogs } from "@client/services/dialogs";
import { PageNotice } from "@client/comps/page/PageNotice";
import { UserExclusionExtendModal } from "#app/modals/user/UserExclusionExtendModal";
import { SitePage } from "#app/comps/site-page/SitePage";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const UserExclusionExtendPage = () => {
  
  const {t} = useTranslation();
  useMount(() => {
    Dialogs.open("primary", <UserExclusionExtendModal />);
  });

  return (
    <SitePage>
      <PageNotice
        image="/graphics/login-banner"
        title={t("selfExclusion.extension.title")}
        message={t("selfExclusion.extension.message")}
        buttonLabel={t("selfExclusion.extension.buttonLabel")}
        onButtonClick={() =>
          Dialogs.open("primary", <UserExclusionExtendModal />)
        }
      />
    </SitePage>
  );
};
