import { Chests } from "@core/services/chests";
import { Div } from "@client/comps/div/Div";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Input } from "@client/comps/input/Input";
import { useDebounceState } from "@client/hooks/system/useDebounceState";
import { SvgSort } from "@client/svgs/common/SvgSort";
import { SvgCoin } from "@client/svgs/common/SvgCoin";
import { SvgSearch } from "@client/svgs/common/SvgSearch";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const PickerHeader = ({
  searchText,
  priceIndex,
  sortIndex,
  setSearchText,
  setPriceIndex,
  setSortIndex,
}: {
  searchText: string | undefined;
  sortIndex: number;
  priceIndex: number;
  setSearchText: (x: string | undefined) => void;
  setPriceIndex: (x: number) => void;
  setSortIndex: (x: number) => void;
}) => {
  const [searchCurrent, setSearchCurrent] = useDebounceState(
    searchText,
    setSearchText,
  );
  const mainLayout = useAppSelector((x) => x.style.mainLayout);
  const collapse = mainLayout === "mobile";

  return (
    <Div
      fx
      align="flex-end"
      gap={8}
    >
      <Input
        type="text"
        iconLeft={SvgSearch}
        placeholder="Search..."
        value={searchCurrent}
        onChange={setSearchCurrent}
      />
      <Dropdown
        type="select"
        icon={SvgCoin}
        options={Chests.priceRanges.slice()}
        value={priceIndex}
        collapse={collapse}
        onChange={(x, i) => setPriceIndex(i)}
      />
      <Dropdown
        type="select"
        icon={SvgSort}
        options={[
          "Most Popular",
          "Highest Price",
          "Lowest Price",
          "Newest",
          "Oldest",
        ]}
        value={sortIndex}
        collapse={collapse}
        onChange={(x, i) => setSortIndex(i)}
      />
    </Div>
  );
};
