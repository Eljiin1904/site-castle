import { Dates } from "@core/services/dates";
import { AffiliateKeyDocument } from "@core/types/affiliates/AffiliateKeyDocument";
import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";
import { Toasts } from "@client/services/toasts";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { SvgCopy } from "@client/svgs/common/SvgCopy";
import { SvgTimesCirlce } from "@client/svgs/common/SvgTimesCircle";

export const KeysTable = ({
  keys,
  isLoading,
  onDisableClick,
}: {
  keys: AffiliateKeyDocument[];
  isLoading: boolean;
  onDisableClick: (keyId: string) => void;
}) => {
  const handleCopy = (text: string | number) => {
    navigator.clipboard.writeText(`${text}`);
    Toasts.success("Copied to clipboard.");
  };

  return (
    <Table
      data={keys}
      loading={isLoading}
      emptyMessage="No keys found."
      columns={[
        {
          heading: "Key",
          grow: 2,
          justify: "flex-start",
          rowRenderer: (x) => (
            <Div
              align="center"
              gap={8}
            >
              {x.enabled && (
                <Vector
                  as={SvgTimesCirlce}
                  color="light-red"
                  size={18}
                  hover="highlight"
                  onClick={() => onDisableClick(x._id)}
                />
              )}
              <Span
                weight="medium"
                color={x.enabled ? "white" : "light-red"}
              >
                {x.key}
              </Span>
              {x.enabled && (
                <Vector
                  as={SvgCopy}
                  color="light-blue"
                  size={18}
                  hover="highlight"
                  onClick={() => handleCopy(x.key)}
                />
              )}
            </Div>
          ),
        },
        {
          heading: "Created",
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => (
            <Span
              weight="medium"
              color="white"
            >
              {Dates.toTimestamp(x.timestamp)}
            </Span>
          ),
        },
      ]}
    />
  );
};
