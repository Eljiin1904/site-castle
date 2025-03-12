import { MarketProviderInfo } from "@core/types/market/MarketProviderInfo";
import { Numbers } from "@core/services/numbers";
import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";
import { Vector } from "@client/comps/vector/Vector";
import { Checkbox } from "@client/comps/checkbox/Checkbox";
import { Div } from "@client/comps/div/Div";
import { Market } from "#app/services/market";

export const ProviderTable = ({
  providers,
  isLoading,
  isProcessing,
  onToggle,
}: {
  providers: MarketProviderInfo[];
  isLoading: boolean;
  isProcessing: boolean;
  onToggle: (x: MarketProviderInfo) => void;
}) => {
  return (
    <Table
      data={providers}
      loading={isLoading}
      columns={[
        {
          heading: "Provider",
          grow: 4,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Div center>
              <Checkbox
                value={x.enabled}
                disabled={isProcessing}
                mr={16}
                onChange={() => onToggle(x)}
              />
              <Vector
                as={Market.getProviderIcon(x.provider)}
                width={100}
                height={24}
                preserveAspectRatio="xMinYMid meet"
              />
            </Div>
          ),
        },
        {
          heading: "Balance USD",
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span
              weight="medium"
              color="white"
            >
              {"$"}
              {Numbers.toLocaleString(x.balance, 2)}
            </Span>
          ),
        },
      ]}
    />
  );
};
