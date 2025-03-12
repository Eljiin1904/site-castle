import { PeerType } from "fireblocks-sdk";
import { Cryptos } from "@server/services/cryptos";
import config from "#app/config";

export async function sweepVaults() {
  const crypto = Cryptos.getInfo("ETH");

  const { accounts: vaults } =
    await Cryptos.fireblocks().getVaultAccountsWithPageInfo({
      assetId: crypto.assetId,
      namePrefix: `UserDeposit_${config.env}`,
      minAmountThreshold: 0.05,
    });

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
}
