import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Div } from "@client/comps/div/Div";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { PageTitle } from "@client/comps/page/PageTitle";


export const StatsHeader = ({}) => {
  const small = useIsMobileLayout();
  const { t } = useTranslation(["account","games"]);
  const indexes = [10, 20, 25, 50];
  return (
    <Div
      justify={small ? "space-between" : undefined}
      align="center"
      gap={small ? 20: 24}
    >
      {!small && (
        <PageTitle
          heading={t('stats.title')}
        />
      )}
      {/* <Dropdown
        type="select"
        fx={small}
        size="sm"
        options={indexes}
        value={indexes.indexOf(0)}
        onChange={(x, i) => {}}
      /> */}
    </Div>
  );
};
