import { PeerType } from "fireblocks-sdk";
import { CryptoInfo } from "@core/types/cryptos/CryptoInfo";
import { System } from "@server/services/system";
import { Cryptos } from "@server/services/cryptos";
import config from "#app/config";

export async function sweepAccountOmnibus() {
  const tokens = Cryptos.infos.filter(
    (x) => x.walletType === "account" && x.isToken,
  );
  const coins = Cryptos.infos.filter(
    (x) => x.walletType === "account" && !x.isToken,
  );

  // do tokens first so we dont sweep their gas

  for (const crypto of tokens) {
    await System.tryCatch(handleCrypto)(crypto);
  }

  for (const crypto of coins) {
    await System.tryCatch(handleCrypto)(crypto);
  }
}

async function handleCrypto(crypto: CryptoInfo) {
  const vault = await Cryptos.fireblocks().getVaultAccountById(
    config.fireblocksOmnibusId,
  );
  const asset = vault.assets?.find((x) => x.id === crypto.assetId);

  if (!asset) {
    return;
  }

  const cryptoAmount = Number.parseFloat(asset.total);

  if (cryptoAmount < 0.00001) {
    return;
  }

  // dont sweep gas
  if (crypto.kind === "ETH" && cryptoAmount < 0.011) {
    return;
  }
  if (crypto.kind === "TRX" && cryptoAmount < 65) {
    return;
  }

  const { feeAmount } = await Cryptos.estimateFee({
    kind: crypto.kind,
    amount: asset.total,
    source: {
      type: PeerType.VAULT_ACCOUNT,
      id: config.fireblocksOmnibusId,
    },
    destination: {
      type: PeerType.VAULT_ACCOUNT,
      id: config.fireblocksTreasuryId,
    },
  });

  if (feeAmount / cryptoAmount > 0.03) {
    return;
  }

  await Cryptos.fireblocks().createTransaction({
    assetId: crypto.assetId,
    amount: asset.total,
    source: {
      type: PeerType.VAULT_ACCOUNT,
      id: config.fireblocksOmnibusId,
    },
    destination: {
      type: PeerType.VAULT_ACCOUNT,
      id: config.fireblocksTreasuryId,
    },
    treatAsGrossAmount: !crypto.isToken,
    note: `Sweep_${config.env}`,
  });
}
