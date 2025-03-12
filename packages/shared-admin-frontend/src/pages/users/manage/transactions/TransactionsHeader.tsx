import { TransactionKind } from "@core/types/transactions/TransactionKind";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Heading } from "@client/comps/heading/Heading";
import { SvgFilter } from "@client/svgs/common/SvgFilter";
import { Strings } from "@core/services/strings";
import { Button } from "@client/comps/button/Button";
import { SvgRedo } from "@client/svgs/common/SvgRedo";
import { Transactions } from "#app/services/transactions";
import { CardSection } from "@client/comps/cards/CardSection";

export const TransactionsHeader = ({
  kind,
  isLoading,
  setKind,
  onRefreshClick,
}: {
  kind: TransactionKind | undefined;
  isLoading: boolean;
  setKind: (x: TransactionKind | undefined) => void;
  onRefreshClick: () => void;
}) => {
  return (
    <CardSection
      position="top"
      align="center"
      gap={12}
    >
      <Heading flexGrow>{"Transactions"}</Heading>
      <Dropdown
        type="select"
        icon={SvgFilter}
        options={["All Transactions", ...Transactions.kinds].map(
          Strings.kebabToTitle,
        )}
        value={kind ? Transactions.kinds.indexOf(kind) + 1 : 0}
        onChange={(x, i) =>
          setKind(i === 0 ? undefined : Transactions.kinds[i - 1])
        }
      />
      <Button
        className="refresh-button"
        kind="secondary"
        icon={SvgRedo}
        disabled={isLoading}
        onClick={onRefreshClick}
      />
    </CardSection>
  );
};
