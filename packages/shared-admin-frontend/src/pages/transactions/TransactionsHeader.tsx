import { subDays } from "date-fns";
import { TransactionCategory } from "@core/types/transactions/TransactionCategory";
import { TransactionKind } from "@core/types/transactions/TransactionKind";
import { TransactionStatus } from "@core/types/transactions/TransactionStatus";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { SvgCategory } from "@client/svgs/common/SvgCategory";
import { SvgHourglass } from "@client/svgs/common/SvgHourglass";
import { SvgRedo } from "@client/svgs/common/SvgRedo";
import { Input } from "@client/comps/input/Input";
import { SvgFilter } from "@client/svgs/common/SvgFilter";
import { Strings } from "@core/services/strings";
import { useDebounceState } from "@client/hooks/system/useDebounceState";
import { SvgSearch } from "@client/svgs/common/SvgSearch";
import { Transactions } from "#app/services/transactions";

export const TransactionsHeader = ({
  searchText,
  category,
  kind,
  status,
  minDate,
  maxDate,
  minValue,
  maxValue,
  isLoading,
  setSearchText,
  setCategory,
  setKind,
  setStatus,
  setMinDate,
  setMaxDate,
  setMinValue,
  setMaxValue,
  onRefreshClick,
}: {
  searchText: string | undefined;
  category: TransactionCategory | undefined;
  kind: TransactionKind | undefined;
  status: TransactionStatus | undefined;
  minDate: Date | undefined;
  maxDate: Date | undefined;
  minValue: number | undefined;
  maxValue: number | undefined;
  isLoading: boolean;
  setSearchText: (x: string | undefined) => void;
  setCategory: (x: TransactionCategory | undefined) => void;
  setKind: (x: TransactionKind | undefined) => void;
  setStatus: (x: TransactionStatus | undefined) => void;
  setMinDate: (x: Date | undefined) => void;
  setMaxDate: (x: Date | undefined) => void;
  setMinValue: (x: number | undefined) => void;
  setMaxValue: (x: number | undefined) => void;
  onRefreshClick: () => void;
}) => {
  const [searchCurrent, setSearchCurrent] = useDebounceState(
    searchText,
    setSearchText,
  );

  return (
    <Div
      fx
      column
      gap={12}
    >
      <Div
        fx
        gap={12}
        center
      >
        <Input
          type="text"
          iconLeft={SvgSearch}
          placeholder="Enter transaction ID..."
          value={searchCurrent}
          onChange={setSearchCurrent}
        />
        <Dropdown
          type="select"
          icon={SvgCategory}
          options={[
            "All Categories",
            ...Transactions.categories.map(Strings.kebabToTitle),
          ]}
          value={category ? Transactions.categories.indexOf(category) + 1 : 0}
          onChange={(x, i) =>
            setCategory(i === 0 ? undefined : Transactions.categories[i - 1])
          }
        />
        <Dropdown
          type="select"
          style={{ minWidth: "220px" }}
          icon={SvgFilter}
          options={[
            "All Transactions",
            ...Transactions.kinds.map(Strings.kebabToTitle),
          ]}
          value={kind ? Transactions.kinds.indexOf(kind) + 1 : 0}
          onChange={(x, i) =>
            setKind(i === 0 ? undefined : Transactions.kinds[i - 1])
          }
        />
        <Dropdown
          type="select"
          icon={SvgHourglass}
          options={[
            "All Statuses",
            ...Transactions.statuses.map(Strings.kebabToTitle),
          ]}
          value={status ? Transactions.statuses.indexOf(status) + 1 : 0}
          onChange={(x, i) =>
            setStatus(i === 0 ? undefined : Transactions.statuses[i - 1])
          }
        />
        <Button
          className="refresh-button"
          kind="secondary"
          icon={SvgRedo}
          disabled={isLoading}
          onClick={onRefreshClick}
        />
      </Div>
      <Div
        fx
        gap={12}
      >
        <Button
          kind="secondary"
          size="sm"
          label="24H"
          labelSize={12}
          width={80}
          disabled={isLoading}
          onClick={() => {
            setMinDate(subDays(Date.now(), 1));
            setMaxDate(undefined);
          }}
        />
        <Button
          kind="secondary"
          size="sm"
          label="7D"
          labelSize={12}
          width={80}
          disabled={isLoading}
          onClick={() => {
            setMinDate(subDays(Date.now(), 7));
            setMaxDate(undefined);
          }}
        />
        <Button
          kind="secondary"
          size="sm"
          label="30D"
          labelSize={12}
          width={80}
          disabled={isLoading}
          onClick={() => {
            setMinDate(subDays(Date.now(), 30));
            setMaxDate(undefined);
          }}
        />
        <Input
          type="date"
          format="MM/dd/yyyy HH:mm"
          showTimeSelect
          placeholder="Min Date"
          value={minDate}
          onChange={setMinDate}
        />
        <Input
          type="date"
          format="MM/dd/yyyy HH:mm"
          showTimeSelect
          placeholder="Max Date"
          value={maxDate}
          onChange={setMaxDate}
        />
        <Input
          type="currency"
          placeholder="Min Value"
          value={minValue}
          onChange={setMinValue}
        />
        <Input
          type="currency"
          placeholder="Max Value"
          value={maxValue}
          onChange={setMaxValue}
        />
      </Div>
    </Div>
  );
};
