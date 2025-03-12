import { Fragment } from "react";
import { Strings } from "@core/services/strings";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Input } from "@client/comps/input/Input";
import { Link } from "@client/comps/link/Link";
import { useDebounceState } from "@client/hooks/system/useDebounceState";
import { SvgPlus } from "@client/svgs/common/SvgPlus";
import { SvgRedo } from "@client/svgs/common/SvgRedo";
import { SvgSearch } from "@client/svgs/common/SvgSearch";
import { SvgSort } from "@client/svgs/common/SvgSort";
import { SvgFilter } from "@client/svgs/common/SvgFilter";
import { SvgHistory } from "@client/svgs/common/SvgHistory";
import { Chests } from "#app/services/chests";

export const ChestsHeader = ({
  searchText,
  timeIndex,
  minDate,
  maxDate,
  kindIndex,
  sortIndex,
  isLoading,
  setSearchText,
  setTimeIndex,
  setMinDate,
  setMaxDate,
  setKindIndex,
  setSortIndex,
  onRefreshClick,
}: {
  searchText: string | undefined;
  timeIndex: number;
  minDate: Date | undefined;
  maxDate: Date | undefined;
  kindIndex: number;
  sortIndex: number;
  isLoading: boolean;
  setSearchText: (x: string | undefined) => void;
  setTimeIndex: (x: number) => void;
  setMinDate: (x: Date | undefined) => void;
  setMaxDate: (x: Date | undefined) => void;
  setKindIndex: (x: number) => void;
  setSortIndex: (x: number) => void;
  onRefreshClick: () => void;
}) => {
  const [searchCurrent, setSearchCurrent] = useDebounceState(
    searchText,
    setSearchText,
  );

  return (
    <Div
      fx
      gap={12}
    >
      <Input
        type="text"
        iconLeft={SvgSearch}
        placeholder="Enter chest name..."
        value={searchCurrent}
        onChange={setSearchCurrent}
      />
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
      <Dropdown
        type="select"
        icon={SvgFilter}
        options={Chests.kinds.map((x) => Strings.kebabToTitle(x))}
        value={kindIndex}
        onChange={(x, i) => setKindIndex(i)}
      />
      <Dropdown
        type="select"
        icon={SvgSort}
        options={[
          "Most Popular",
          "Highest Cost",
          "Lowest Cost",
          "Newest",
          "Oldest",
          "Name",
        ]}
        value={sortIndex}
        onChange={(x, i) => setSortIndex(i)}
      />
      <Button
        kind="secondary"
        icon={SvgRedo}
        disabled={isLoading}
        onClick={onRefreshClick}
      />
      <Link
        type="router"
        to="/chests/create"
        hover="none"
      >
        <Button
          kind="primary"
          icon={SvgPlus}
        />
      </Link>
    </Div>
  );
};
