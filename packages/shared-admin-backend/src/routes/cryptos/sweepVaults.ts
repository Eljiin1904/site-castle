import { PeerType } from "fireblocks-sdk";
import { Cryptos } from "@server/services/cryptos";
import { Http } from "#app/services/http";
import config from "#app/config";

export default Http.createApiRoute({
  type: "post",
  path: "/sweep-vaults",
  callback: async (req, res) => {
    const crypto = Cryptos.getInfo("ETH");

    const data = await Cryptos.fireblocks().getVaultAccountsWithPageInfo({
      assetId: crypto.assetId,
      namePrefix: `UserDeposit_${config.env}`,
      minAmountThreshold: 0.05,
    });

    const vaults = data.accounts;

    for (const vault of vaults) {
      const asset = vault.assets?.find((x) => x.id === crypto.assetId);

      if (!asset) {
        return;
      }

      await Cryptos.fireblocks().createTransaction({
        assetId: crypto.assetId,
        amount: asset.total,
        source: {
          type: PeerType.VAULT_ACCOUNT,
          id: vault.id,
        },
        destination: {
          type: PeerType.VAULT_ACCOUNT,
          id: config.fireblocksOmnibusId,
        },
        treatAsGrossAmount: !crypto.isToken,
        note: `Sweep_${config.env}`,
      });
    }

    res.json({});
  },
});
