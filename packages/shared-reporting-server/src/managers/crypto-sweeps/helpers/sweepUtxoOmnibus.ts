import { PeerType } from "fireblocks-sdk";
import { CryptoInfo } from "@core/types/cryptos/CryptoInfo";
import { System } from "@server/services/system";
import { Cryptos } from "@server/services/cryptos";
import config from "#app/config";

export async function sweepUtxoOmnibus() {
  const cryptos = Cryptos.infos.filter((x) => x.walletType === "utxo");

  for (const crypto of cryptos) {
    await System.tryCatch(handleCrypto)(crypto);
  }
}

async function handleCrypto(crypto: CryptoInfo) {
  const unspent = await Cryptos.fireblocks().getUnspentInputs(
    config.fireblocksOmnibusId,
    crypto.assetId,
  );

  const threshold = config.env === "staging" ? 2 : 50;

  if (unspent.length < threshold) {
    return;
  }

  const { maxSpendableAmount } =
    await Cryptos.fireblocks().getMaxSpendableAmount(
      config.fireblocksOmnibusId,
      crypto.assetId,
    );

  await Cryptos.fireblocks().createTransaction({
    assetId: crypto.assetId,
    amount: maxSpendableAmount,
    source: {
      type: PeerType.VAULT_ACCOUNT,
      id: config.fireblocksOmnibusId,
    },
    destination: {
      type: PeerType.VAULT_ACCOUNT,
      id: config.fireblocksTreasuryId,
    },
    treatAsGrossAmount: true,
    note: `Sweep_${config.env}`,
  });
}
