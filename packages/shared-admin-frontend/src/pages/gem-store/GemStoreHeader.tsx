import { RewardProductKind } from "@core/types/rewards/RewardProductKind";
import { Strings } from "@core/services/strings";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { useDebounceState } from "@client/hooks/system/useDebounceState";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { SvgPlus } from "@client/svgs/common/SvgPlus";
import { SvgRedo } from "@client/svgs/common/SvgRedo";
import { SvgFilter } from "@client/svgs/common/SvgFilter";
import { SvgSearch } from "@client/svgs/common/SvgSearch";
import { Input } from "@client/comps/input/Input";
import { SvgSort } from "@client/svgs/common/SvgSort";
import { Rewards } from "#app/services/rewards";

export const GemStoreHeader = ({
  searchText,
  kind,
  sortIndex,
  isLoading,
  setSearchText,
  setKind,
  setSortIndex,
  onCreateClick,
  onRefreshClick,
}: {
  searchText: string | undefined;
  kind: RewardProductKind | undefined;
  sortIndex: number;
  isLoading: boolean;
  setSearchText: (x: string | undefined) => void;
  setKind: (x: RewardProductKind | undefined) => void;
  setSortIndex: (x: number) => void;
  onCreateClick: () => void;
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
        placeholder="Enter product name..."
        value={searchCurrent}
        onChange={setSearchCurrent}
      />
      <Dropdown
        type="select"
        icon={SvgFilter}
        options={[
          "All Products",
          ...Rewards.productKinds.map(Strings.kebabToTitle),
        ]}
        value={kind ? Rewards.productKinds.indexOf(kind) + 1 : 0}
        onChange={(x, i) =>
          setKind(i === 0 ? undefined : Rewards.productKinds[i - 1])
        }
      />
      <Dropdown
        type="select"
        icon={SvgSort}
        options={["Newest", "Oldest", "Highest Cost", "Lowest Cost"]}
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
};
