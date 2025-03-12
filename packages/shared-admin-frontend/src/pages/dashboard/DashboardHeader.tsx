import { Fragment } from "react";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Input } from "@client/comps/input/Input";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { SvgRedo } from "@client/svgs/common/SvgRedo";
import { SvgHistory } from "@client/svgs/common/SvgHistory";

export const DashboardHeader = ({
  timeIndex,
  minDate,
  maxDate,
  isLoading,
  setTimeIndex,
  setMinDate,
  setMaxDate,
  onRefreshClick,
}: {
  timeIndex: number;
  minDate: Date | undefined;
  maxDate: Date | undefined;
  isLoading: boolean;
  setTimeIndex: (x: number) => void;
  setMinDate: (x: Date | undefined) => void;
  setMaxDate: (x: Date | undefined) => void;
  onRefreshClick: () => void;
}) => {
  return (
    <Div fx>
      <Div
        grow
        gap={12}
      >
        <Dropdown
          type="select"
          icon={SvgHistory}
          options={[
            "Today",
            "This Week",
            "This Month",
            "This Year",
            "All Time",
            "Custom",
          ]}
          value={timeIndex}
          onChange={(x, i) => setTimeIndex(i)}
        />
        {timeIndex === 5 && (
          <Fragment>
            <Input
              fx={undefined}
              type="date"
              format="MM/dd/yyyy"
              placeholder="Start Date"
              value={minDate}
              onChange={setMinDate}
            />
            <Input
              fx={undefined}
              type="date"
              format="MM/dd/yyyy"
              placeholder="End Date"
              value={maxDate}
              onChange={setMaxDate}
            />
          </Fragment>
        )}
      </Div>
      <Button
        kind="secondary"
        icon={SvgRedo}
        disabled={isLoading}
        onClick={onRefreshClick}
      />
    </Div>
  );
};
