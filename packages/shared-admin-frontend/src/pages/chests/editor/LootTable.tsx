import { SetStateAction } from "react";
import { ChestItem } from "@core/types/chests/ChestItem";
import { Intimal } from "@core/services/intimal";
import { Numbers } from "@core/services/numbers";
import { Div } from "@client/comps/div/Div";
import { Img } from "@client/comps/img/Img";
import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";
import { Checkbox } from "@client/comps/checkbox/Checkbox";
import { Vector } from "@client/comps/vector/Vector";
import { SvgFill } from "@client/svgs/common/SvgFill";
import { SvgTimes } from "@client/svgs/common/SvgTimes";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Input } from "@client/comps/input/Input";
import { SvgPercent } from "@client/svgs/common/SvgPercent";
import { SvgChicken } from "@client/svgs/common/SvgChicken";
import { SvgAnnouncement } from "@client/svgs/common/SvgAnnouncement";
import { SvgDiamond } from "@client/svgs/common/SvgDiamond";
import { ChestAction } from "./ChestAction";
import "./LootTable.scss";

export const LootTable = ({
  action,
  items,
  setItems,
}: {
  action: ChestAction;
  items: ChestItem[];
  setItems: (x: SetStateAction<ChestItem[]>) => void;
}) => {
  return (
    <Table
      className="LootTable"
      data={items}
      emptyMessage="No items added yet."
      columns={[
        {
          heading: "#",
          grow: 1,
          justify: "flex-start",
          rowRenderer: (item, i) => <Span>{i + 1}</Span>,
        },
        {
          heading: "Item",
          grow: 6,
          justify: "flex-start",
          rowRenderer: (item) => (
            <Div
              gap={12}
              align="center"
              fx
            >
              <Img
                type="png"
                path={`/items/${item.slug}`}
                width="40px"
                height="auto"
              />
              <Span color="white">
                {item.baseName + " | "}
                {item.edition !== "Standard" && item.edition + " "}
                {item.styleName}
              </Span>
            </Div>
          ),
        },
        {
          heading: "SYM",
          grow: 1,
          justify: "flex-start",
          rowRenderer: (item) => <Span color="white">{item.symbol}</Span>,
        },
        {
          heading: "Type",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (item) => <Span color="white">{item.subType}</Span>,
        },
        {
          heading: "Value",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (item) => <Tokens value={item.lootValue} />,
        },
        {
          heading: "Chance",
          grow: 4,
          justify: "flex-start",
          rowRenderer: (item, i) => (
            <Div
              align="center"
              gap={4}
            >
              <Input
                className="win-input"
                type="decimal"
                decimals={4}
                placeholder="0.0000"
                disabled={action !== "create"}
                fx
                value={
                  item.dropRate
                    ? Intimal.toDecimal(item.dropRate * 100, 6)
                    : undefined
                }
                iconRight={SvgPercent}
                onChange={(x) => {
                  if (x === undefined) x = 0;
                  item.dropRate = Intimal.fromDecimal(x) / 100;
                  setItems(items.slice());
                }}
              />
              <Div
                className="drop-rate"
                center
                bg="brown-8"
                border
              >
                <Span color="light-blue">
                  {item.dropRate
                    ? `1/${Numbers.round(1 / Intimal.toDecimal(item.dropRate, 6), 2)}`
                    : "N/A"}
                </Span>
              </Div>
            </Div>
          ),
        },
        {
          heading: "EV",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (item) => (
            <Span color="light-green">
              {Intimal.toLocaleString(
                item.lootValue * Intimal.toDecimal(item.dropRate, 6),
                4,
              )}
            </Span>
          ),
        },
        {
          grow: 1,
          justify: "flex-end",
          heading: (
            <Div
              gap={14}
              mr={8}
            >
              <Vector
                as={SvgDiamond}
                hover="highlight"
                data-tooltip-id="app-tooltip"
                data-tooltip-content="Jackpot"
              />
              <Vector
                as={SvgChicken}
                hover="highlight"
                data-tooltip-id="app-tooltip"
                data-tooltip-content="Special"
              />
              <Vector
                as={SvgAnnouncement}
                hover="highlight"
                data-tooltip-id="app-tooltip"
                data-tooltip-content="Announce"
              />
            </Div>
          ),
          rowRenderer: (item) => (
            <Div gap={6}>
              <Checkbox
                value={item.jackpot}
                onChange={(x) => {
                  item.jackpot = x;
                  setItems(items.slice());
                }}
              />
              <Checkbox
                value={item.special}
                onChange={(x) => {
                  item.special = x;
                  setItems(items.slice());
                }}
              />
              <Checkbox
                value={item.announce}
                onChange={(x) => {
                  item.announce = x;
                  setItems(items.slice());
                }}
              />
            </Div>
          ),
        },
        {
          heading: "Menu",
          hidden: action !== "create",
          grow: 2,
          justify: "flex-end",
          rowRenderer: (item, i) => (
            <Div gap={10}>
              <Vector
                as={SvgFill}
                size={16}
                color="white"
                p={6}
                bg="dark-blue"
                border
                hover="highlight"
                onClick={() =>
                  setItems((items) => {
                    let amount = Intimal.fromDecimal(1);
                    amount -= items.reduce((value, x) => value + x.dropRate, 0);
                    items[i].dropRate += amount;
                    return items.slice();
                  })
                }
              />
              <Vector
                as={SvgTimes}
                size={14}
                color="white"
                p={7}
                bg="dark-red"
                border
                hover="highlight"
                onClick={() =>
                  setItems((items) => {
                    items.splice(i, 1);
                    return items.slice();
                  })
                }
              />
            </Div>
          ),
        },
      ]}
    />
  );
};
