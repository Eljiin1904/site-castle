import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Input } from "@client/comps/input/Input";
import { SvgCard } from "@client/svgs/common/SvgCard";
import { SvgPlus } from "@client/svgs/common/SvgPlus";
import { SvgRedo } from "@client/svgs/common/SvgRedo";
import { SvgSort } from "@client/svgs/common/SvgSort";
import { useDebounceState } from "@client/hooks/system/useDebounceState";
import { Dialogs } from "@client/services/dialogs";
import { SvgSearch } from "@client/svgs/common/SvgSearch";
import { GiftCardModal } from "#app/modals/gift-card/GiftCardModal";

export const GiftCardsHeader = ({
  searchText,
  sortIndex,
  isLoading,
  setSearchText,
  setSortIndex,
  onCreateClick,
  onRefreshClick,
}: {
  searchText: string | undefined;
  sortIndex: number;
  isLoading: boolean;
  setSearchText: (x: string | undefined) => void;
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
        placeholder="Enter batch ID..."
        value={searchCurrent}
        onChange={setSearchCurrent}
      />
      <Dropdown
        type="select"
        icon={SvgSort}
        options={["Created", "Last Used", "ID"]}
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
        kind="secondary"
        icon={SvgCard}
        onClick={() => Dialogs.open("primary", <GiftCardModal />)}
      />
      <Button
        kind="primary"
        icon={SvgPlus}
        onClick={onCreateClick}
      />
    </Div>
  );
};
