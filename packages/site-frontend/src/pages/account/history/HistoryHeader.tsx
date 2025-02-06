import { TransactionCategory } from "@core/types/transactions/TransactionCategory";
import { Strings } from "@core/services/strings";
import { Transactions } from "@core/services/transactions";
import { CardSection } from "@client/comps/cards/CardSection";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Heading } from "@client/comps/heading/Heading";
import { SvgFilter } from "@client/svgs/common/SvgFilter";
import { SvgRedo } from "@client/svgs/common/SvgRedo";
import { Button } from "@client/comps/button/Button";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const HistoryHeader = ({
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
  const mainLayout = useAppSelector((x) => x.style.mainLayout);
  const collapse = mainLayout === "mobile";

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
          {"Game History"}
        </Heading>
      )}
      <Dropdown
        type="select"
        icon={SvgFilter}
        width={collapse ? "full" : undefined}
        options={["All Games", ...Transactions.gameCategories].map(
          Strings.kebabToTitle,
        )}
        value={category ? Transactions.gameCategories.indexOf(category) + 1 : 0}
        onChange={(x, i) =>
          setCategory(i === 0 ? undefined : Transactions.gameCategories[i - 1])
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
