import { Button } from "@client/comps/button/Button";
import { SvgRedo } from "@client/svgs/common/SvgRedo";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Div } from "@client/comps/div/Div";
import { PageTitle } from "@client/comps/page/PageTitle";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Chests } from "@core/services/chests";
import { Strings } from "@core/services/strings";

export const CaseGameHeader = ({
  kindIndex,
  isLoading,
  setKindIndex,
  onRefreshClick,
}: {
  kindIndex: number;
  isLoading: boolean;
  setKindIndex: (x: number) => void;
  onRefreshClick: () => void;
}) => {
  const small = useIsMobileLayout();
  const { t } = useTranslation(["fairness"]);   
    return (
      <Div center gap={small ? 20: 24} flexShrink justifyContent="space-between">
        <PageTitle heading={t('pastResults.title')}></PageTitle>
        <Dropdown
          type="select"
          fx={!small}
          size={"sm"}
          collapse={small}
          options={Chests.kinds.map((x) => Strings.kebabToTitle(x))}
          value={kindIndex}
          onChange={(x, i) => setKindIndex(i)}
        />
        <Button
          kind="tertiary-grey"
          icon={SvgRedo}
          disabled={isLoading}
          onClick={onRefreshClick}
        />
      </Div>);
};
