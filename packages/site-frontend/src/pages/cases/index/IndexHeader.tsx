import { Chests } from "@core/services/chests";
import { Div } from "@client/comps/div/Div";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Input } from "@client/comps/input/Input";
import { useDebounceState } from "@client/hooks/system/useDebounceState";
import { SvgSearch } from "@client/svgs/common/SvgSearch";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";

export const IndexHeader = ({
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
  
  const collapse =useIsMobileLayout();

  return (
    <Div
      fx
      align="flex-end"
      gap={24}
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
        tag="Price:"
        options={Chests.priceRanges.slice()}
        value={priceIndex}
        collapse={collapse}
        onChange={(x, i) => setPriceIndex(i)}
        size="md"
      />
      <Dropdown
        type="select"
        tag="Sort By:"
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
