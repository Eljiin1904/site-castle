import { CryptoAsset } from "@core/types/cryptos/CryptoAsset";
import { Numbers } from "@core/services/numbers";
import { Span } from "@client/comps/span/Span";
import { Table } from "@client/comps/table/Table";
import { Vector } from "@client/comps/vector/Vector";
import { Div } from "@client/comps/div/Div";
import { Cryptos } from "#app/services/cryptos";

export const HotWalletTable = ({
  assets,
  isLoading,
}: {
  assets: CryptoAsset[];
  isLoading: boolean;
}) => {
  return (
    <Table
      data={assets}
      loading={isLoading}
      columns={[
        {
          heading: "Crypto",
          grow: 4,
          justify: "flex-start",
          rowRenderer: (x) => {
            const crypto = Cryptos.getInfo(x.cryptoKind);
            return (
              <Div
                center
                gap={8}
              >
                <Vector
                  as={Cryptos.getIcon(crypto.symbol)}
                  size={18}
                />
                <Span
                  weight="medium"
                  color="white"
                >
                  {x.cryptoKind.replace("_", " ")}
                </Span>
              </Div>
            );
          },
        },
        {
          heading: "Balance",
          grow: 2,
          justify: "flex-end",
          rowRenderer: (x) => {
            const crypto = Cryptos.getInfo(x.cryptoKind);
            return (
              <Span
                weight="medium"
                color="white"
              >
                {Numbers.round(
                  x.cryptoAmount,
                  crypto.decimals,
                ).toLocaleString()}
              </Span>
            );
          },
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
              {Numbers.toLocaleString(x.usdAmount, 2)}
            </Span>
          ),
        },
      ]}
    />
  );
};
