import { Button } from "@client/comps/button/Button";
import { SvgRedo } from "@client/svgs/common/SvgRedo";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Div } from "@client/comps/div/Div";
import { PageTitle } from "@client/comps/page/PageTitle";

export const GameHeader = ({
  isLoading,
  onRefreshClick,
}: {
  isLoading: boolean;
  onRefreshClick: () => void;
}) => {
  const small = useIsMobileLayout();
  const { t } = useTranslation(["fairness"]);   
    return (
      <Div center gap={small ? 20: 24} flexShrink justifyContent="space-between">
        <PageTitle heading={t('pastResults.title')}></PageTitle>
        <Button
          kind="tertiary-grey"
          icon={SvgRedo}
          disabled={isLoading}
          onClick={onRefreshClick}
        />
      </Div>);
};
