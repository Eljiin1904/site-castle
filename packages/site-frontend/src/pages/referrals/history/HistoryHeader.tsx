import { TransactionCategory } from "@core/types/transactions/TransactionCategory";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Div } from "@client/comps/div/Div";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { PageTitle } from "@client/comps/page/PageTitle";
import { Span } from "@client/comps/span/Span";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const HistoryHeader = ({
  limit,
  setLimit
}: {
  limit: number;
  setLimit: (x: number) => void;
}) => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile" || layout === "tablet";
  const { t } = useTranslation(["referrals"]);
  const indexes = [10, 20, 25, 50];
  return (
    <Div
      justify={"space-between"}
      fx
      column={small}
      gap={24}
    >
      <PageTitle width={0}
        heading={t('history.title')}
      />
      <Div center gap={12}>
        <Span flexShrink>{t("common:perPage")}</Span>
        <Dropdown
          type="select"
          fx={small}
          size="sm"
          options={indexes}
          value={indexes.indexOf(limit)}
          onChange={(x, i) => setLimit(indexes[i])}
        />
      </Div>
    </Div>
  );
};