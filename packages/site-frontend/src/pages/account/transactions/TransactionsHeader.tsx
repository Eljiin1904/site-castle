import { TransactionCategory } from "@core/types/transactions/TransactionCategory";
import { Transactions } from "@core/services/transactions";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Button } from "@client/comps/button/Button";
import { SvgRedo } from "@client/svgs/common/SvgRedo";
import { PageTitle } from "@client/comps/page/PageTitle";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const TransactionsHeader = ({
  category,
  isLoading,
  setCategory,
  limit,
  setLimit,
  onRefreshClick,
}: {
  category: TransactionCategory | undefined;
  isLoading: boolean;
  setCategory: (x: TransactionCategory | undefined) => void;
  limit: number;
  setLimit: (x: number) => void;
  onRefreshClick: () => void;
}) => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const small = layout === "mobile" || layout === "tablet";
  const { t } = useTranslation(["account"]);

  const indexes = [10, 20, 25, 50];
  return (
    <Div
      justify={"space-between"}
      fx
      column={small}
      gap={24}
      wrap
    >
      <PageTitle width={0}
        heading={t('transactions.title')}
      />
      <Div center gap={small ? 20: 24} flexShrink justifyContent="space-between">
        <Div gap={12}>
          <Dropdown
            type="select"
            fx={!small}
            size={"sm"}
            options={['all', ...Transactions.notGameCategories].map((x) => t(`transactions.type.${x}`))}
            value={
              category ? Transactions.notGameCategories.indexOf(category) + 1 : 0
            }
            onChange={(x, i) =>
              setCategory(
                i === 0 ? undefined : Transactions.notGameCategories[i - 1],
              )
            }
          />
          {layout !== "mobile" && <Button
            kind="tertiary-grey"
            icon={SvgRedo}
            disabled={isLoading}
            onClick={onRefreshClick}
          />}
        </Div>      
        <Div center gap={12}>
        <Span flexShrink>{t("common:perPage")}</Span>        
        <Dropdown
          type="select"
          fx={!small}
          size={"sm"}
          options={indexes}
          value={indexes.indexOf(limit)}
          onChange={(x, i) => setLimit(indexes[i])}
        />   
        </Div>
      </Div>   
    </Div>
  );
};
