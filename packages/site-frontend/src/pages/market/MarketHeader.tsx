import { useState } from "react";
import { ItemSubType } from "@core/types/items/ItemSubType";
import { MarketProvider } from "@core/types/market/MarketProvider";
import { ItemWear } from "@core/types/items/ItemWear";
import { Strings } from "@core/services/strings";
import { Items } from "@core/services/items";
import { Numbers } from "@core/services/numbers";
import { Div } from "@client/comps/div/Div";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Input } from "@client/comps/input/Input";
import { useDebounceState } from "@client/hooks/system/useDebounceState";
import { SvgSort } from "@client/svgs/common/SvgSort";
import { SvgSearch } from "@client/svgs/common/SvgSearch";
import { SvgRedo } from "@client/svgs/common/SvgRedo";
import { Button } from "@client/comps/button/Button";
import { SvgCategory } from "@client/svgs/common/SvgCategory";
import { Slider } from "@client/comps/slider/Slider";
import { SvgFilter } from "@client/svgs/common/SvgFilter";
import { DropdownButton } from "@client/comps/dropdown/DropdownButton";
import { DropdownBody } from "@client/comps/dropdown/DropdownBody";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { SvgCertificate } from "@client/svgs/common/SvgCertificate";
import { SvgCheckCircle } from "@client/svgs/common/SvgCheckCircle";
import { Span } from "@client/comps/span/Span";
import { Market } from "#app/services/market";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const MarketHeader = ({
  isLoading,
  searchText,
  priceRange,
  subType,
  wear,
  provider,
  sortIndex,
  setSearchText,
  setPriceRange,
  setSubType,
  setWear,
  setProvider,
  setSortIndex,
  onRefreshClick,
}: {
  isLoading: boolean;
  searchText: string | undefined;
  priceRange: [number, number];
  subType: ItemSubType | undefined;
  wear: ItemWear | undefined;
  provider: MarketProvider | undefined;
  sortIndex: number;
  setSearchText: (x: string | undefined) => void;
  setPriceRange: (x: [number, number]) => void;
  setSubType: (x: ItemSubType | undefined) => void;
  setWear: (x: ItemWear | undefined) => void;
  setProvider: (x: MarketProvider | undefined) => void;
  setSortIndex: (x: number) => void;
  onRefreshClick: () => void;
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const [searchCurrent, setSearchCurrent] = useDebounceState(
    searchText,
    setSearchText,
  );

  const [priceCurrent, setPriceCurrent] = useDebounceState(
    priceRange,
    setPriceRange,
  );

  const mainLayout = useAppSelector((x) => x.style.mainLayout);
  const collapse = mainLayout === "mobile";

  return (
    <Div
      fx
      align="flex-end"
      gap={collapse ? 8 : 12}
    >
      <Input
        type="text"
        iconLeft={SvgSearch}
        placeholder="Search..."
        value={searchCurrent}
        onChange={setSearchCurrent}
      />
      <Dropdown
        type="custom"
        menuWidth={collapse ? "280px" : "300px"}
        menuOverflow="visible"
        forceAlign={collapse ? "center" : "right"}
        open={showFilters}
        onToggle={setShowFilters}
        button={
          <DropdownButton
            label="Filters"
            icon={SvgFilter}
            open={showFilters}
            collapse={collapse}
          />
        }
        body={
          <DropdownBody
            p={16}
            gap={12}
            bg="gray-7"
          >
            <ModalSection>
              <ModalLabel>
                {"Price Range"}
                <Span
                  family="title"
                  weight="semi-bold"
                  size={12}
                  color="gold"
                  flexGrow
                  textAlign="right"
                >
                  {Numbers.toLocaleString(priceCurrent[0], 2)}
                  {" - "}
                  {Numbers.toLocaleString(priceCurrent[1], 2)}
                </Span>
              </ModalLabel>
              <Slider
                type="currency"
                value={priceCurrent}
                maxValue={50000}
                onChange={setPriceCurrent}
              />
            </ModalSection>
            <ModalSection>
              <ModalLabel>{"Type"}</ModalLabel>
              <Dropdown
                type="select"
                icon={SvgCategory}
                options={[
                  "All Types",
                  ...Items.subTypes.slice().map((x) => Strings.kebabToTitle(x)),
                ]}
                value={subType ? Items.subTypes.indexOf(subType) + 1 : 0}
                onChange={(x, i) => setSubType(Items.subTypes[i - 1])}
              />
            </ModalSection>
            <ModalSection>
              <ModalLabel>{"Wear"}</ModalLabel>
              <Dropdown
                type="select"
                icon={SvgCertificate}
                options={[
                  "All Wears",
                  ...Items.wears.slice().map((x) => Strings.kebabToTitle(x)),
                ]}
                value={wear ? Items.wears.indexOf(wear) + 1 : 0}
                onChange={(x, i) => setWear(Items.wears[i - 1])}
              />
            </ModalSection>
            <ModalSection>
              <ModalLabel>{"Provider"}</ModalLabel>
              <Dropdown
                type="select"
                icon={SvgCheckCircle}
                options={[
                  "All Providers",
                  ...Market.providers
                    .slice()
                    .map((x) => Strings.kebabToTitle(x)),
                ]}
                value={provider ? Market.providers.indexOf(provider) + 1 : 0}
                onChange={(x, i) => setProvider(Market.providers[i - 1])}
              />
            </ModalSection>
          </DropdownBody>
        }
      />
      <Dropdown
        type="select"
        icon={SvgSort}
        options={["Highest Price", "Lowest Price", "A-Z", "Z-A"]}
        value={sortIndex}
        collapse={collapse}
        onChange={(x, i) => setSortIndex(i)}
      />
      <Button
        kind="secondary"
        icon={SvgRedo}
        disabled={isLoading}
        onClick={onRefreshClick}
      />
    </Div>
  );
};
