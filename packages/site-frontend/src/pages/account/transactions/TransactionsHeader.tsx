import { TransactionCategory } from "@core/types/transactions/TransactionCategory";
import { Strings } from "@core/services/strings";
import { Transactions } from "@core/services/transactions";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Heading } from "@client/comps/heading/Heading";
import { SvgFilter } from "@client/svgs/common/SvgFilter";
import { Button } from "@client/comps/button/Button";
import { SvgRedo } from "@client/svgs/common/SvgRedo";
import { CardSection } from "@client/comps/cards/CardSection";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const TransactionsHeader = ({
  category,
  isLoading,
  setCategory,
  onRefreshClick,
}: {
  category: TransactionCategory | undefined;
  isLoading: boolean;
  setCategory: (x: TransactionCategory | undefined) => void;
  onRefreshClick: () => void;
}) => {
  const layout = useAppSelector((x) => x.style.mainLayout);
  const collapse = layout === "mobile";

  return (
    <CardSection
      position="top"
      justify={collapse ? "space-between" : undefined}
      align="center"
      gap={12}
    >
      {!collapse && (
        <Heading
          as="h2"
          fx
        >
          {"Transactions"}
        </Heading>
      )}
      <Dropdown
        type="select"
        icon={SvgFilter}
        width={collapse ? "full" : undefined}
        options={["All Transactions", ...Transactions.notGameCategories].map(
          Strings.kebabToTitle,
        )}
        value={
          category ? Transactions.notGameCategories.indexOf(category) + 1 : 0
        }
        onChange={(x, i) =>
          setCategory(
            i === 0 ? undefined : Transactions.notGameCategories[i - 1],
          )
        }
      />
      <Button
        kind="secondary"
        icon={SvgRedo}
        disabled={isLoading}
        onClick={onRefreshClick}
      />
    </CardSection>
  );
};
