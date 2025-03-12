import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Input } from "@client/comps/input/Input";
import { useDebounceState } from "@client/hooks/system/useDebounceState";
import { SvgPlus } from "@client/svgs/common/SvgPlus";
import { SvgRedo } from "@client/svgs/common/SvgRedo";
import { SvgSearch } from "@client/svgs/common/SvgSearch";
import { SvgSort } from "@client/svgs/common/SvgSort";
import { Link } from "@client/comps/link/Link";

export const HolidayHeader = ({
  searchText,
  sortIndex,
  isLoading,
  setSearchText,
  setSortIndex,
  onRefreshClick,
}: {
  searchText: string | undefined;
  sortIndex: number;
  isLoading: boolean;
  setSearchText: (x: string | undefined) => void;
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
        placeholder="Enter holiday id..."
        value={searchCurrent}
        onChange={setSearchCurrent}
      />
      <Dropdown
        type="select"
        icon={SvgSort}
        options={["Newest", "Oldest"]}
        value={sortIndex}
        onChange={(x, i) => setSortIndex(i)}
      />
      <Button
        className="refresh-button"
        kind="secondary"
        icon={SvgRedo}
        disabled={isLoading}
        onClick={onRefreshClick}
      />
      <Link
        type="router"
        to="/holidays/create"
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
