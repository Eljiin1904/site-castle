import { PageTitle } from "@client/comps/page/PageTitle";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Div } from "@client/comps/div/Div";

export const SettingsHeader = () => {
  const small = useIsMobileLayout();
  const { t } = useTranslation(["account"]);

  return (
    <Div
      justify={small ? "space-between" : undefined}
      align="center"
      gap={small ? 20: 24}
    >
      {!small && (
        <PageTitle
          heading={t('settings.title')}
        />
      )}     
    </Div>
  );
};
