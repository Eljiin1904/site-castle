import { useMount } from "@client/hooks/system/useMount";
import { Dialogs } from "@client/services/dialogs";
import { PageNotice } from "@client/comps/page/PageNotice";
import { UserExclusionExtendModal } from "#app/modals/user/UserExclusionExtendModal";
import { SitePage } from "#app/comps/site-page/SitePage";

export const UserExclusionExtendPage = () => {
  useMount(() => {
    Dialogs.open("primary", <UserExclusionExtendModal />);
  });

  return (
    <SitePage>
      <PageNotice
        image="/graphics/notice-chicken-login"
        title="Extend Self-Exclusion"
        message="To extend your self-exclusion, please click the button below."
        buttonLabel="Extend Self-Exclusion"
        onButtonClick={() =>
          Dialogs.open("primary", <UserExclusionExtendModal />)
        }
      />
    </SitePage>
  );
};
