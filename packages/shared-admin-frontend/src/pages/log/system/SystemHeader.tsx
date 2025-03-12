import { subDays } from "date-fns";
import { SystemLogKind } from "@core/types/system/SystemLogKind";
import { System } from "@core/services/system";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Input } from "@client/comps/input/Input";
import { SvgFilter } from "@client/svgs/common/SvgFilter";
import { Strings } from "@core/services/strings";
import { Button } from "@client/comps/button/Button";
import { SvgRedo } from "@client/svgs/common/SvgRedo";
import { CardSection } from "@client/comps/cards/CardSection";

export const SystemHeader = ({
  kind,
  minDate,
  maxDate,
  isLoading,
  setKind,
  setMinDate,
  setMaxDate,
  onRefreshClick,
}: {
  kind: SystemLogKind | undefined;
  minDate: Date | undefined;
  maxDate: Date | undefined;
  isLoading: boolean;
  setKind: (x: SystemLogKind | undefined) => void;
  setMinDate: (x: Date | undefined) => void;
  setMaxDate: (x: Date | undefined) => void;
  onRefreshClick: () => void;
}) => {
  return (
    <CardSection
      position="top"
      align="center"
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
      <Dropdown
        type="select"
        icon={SvgFilter}
        options={["All Kinds", ...System.logKinds].map(Strings.kebabToTitle)}
        value={kind ? System.logKinds.indexOf(kind) + 1 : 0}
        onChange={(x, i) =>
          setKind(i === 0 ? undefined : System.logKinds[i - 1])
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
