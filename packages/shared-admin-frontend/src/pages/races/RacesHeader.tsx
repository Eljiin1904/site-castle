import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Input } from "@client/comps/input/Input";
import { useDebounceState } from "@client/hooks/system/useDebounceState";
import { SvgPlus } from "@client/svgs/common/SvgPlus";
import { SvgRedo } from "@client/svgs/common/SvgRedo";
import { SvgSearch } from "@client/svgs/common/SvgSearch";
import { SvgSort } from "@client/svgs/common/SvgSort";

export function RacesHeader({
  searchText,
  searchIndex,
  sortIndex,
  isLoading,
  setSearchText,
  setSearchIndex,
  setSortIndex,
  onCreateClick,
  onRefreshClick,
}: {
  searchText: string | undefined;
  searchIndex: number;
  sortIndex: number;
  isLoading: boolean;
  setSearchText: (x: string | undefined) => void;
  setSearchIndex: (x: number) => void;
  setSortIndex: (x: number) => void;
  onCreateClick: () => void;
  onRefreshClick: () => void;
}) {
  const [searchCurrent, setSearchCurrent] = useDebounceState(
    searchText,
    setSearchText,
  );

  return (
    <Div
      fx
      gap={12}
    >
      <Dropdown
        type="select"
        icon={SvgSearch}
        options={["Race Name", "Race ID"]}
        value={searchIndex}
        onChange={(x, i) => setSearchIndex(i)}
      />
      <Input
        type="text"
        iconLeft={SvgSearch}
        placeholder="Enter search text..."
        value={searchCurrent}
        onChange={setSearchCurrent}
      />
      <Dropdown
        type="select"
        icon={SvgSort}
        options={["Start", "Created", "Name"]}
        value={sortIndex}
        onChange={(x, i) => setSortIndex(i)}
      />
      <Button
        kind="secondary"
        icon={SvgRedo}
        disabled={isLoading}
        onClick={onRefreshClick}
      />
      <Button
        kind="primary"
        icon={SvgPlus}
        onClick={onCreateClick}
      />
    </Div>
  );
}
