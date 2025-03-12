import { PeerType, VaultAccountResponse } from "fireblocks-sdk";
import { CryptoInfo } from "@core/types/cryptos/CryptoInfo";
import { System } from "@server/services/system";
import { Cryptos } from "@server/services/cryptos";
import config from "#app/config";

export async function sweepAccountVaults() {
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
  const { accounts: vaults } =
    await Cryptos.fireblocks().getVaultAccountsWithPageInfo({
      assetId: crypto.assetId,
      namePrefix: `UserDeposit_${config.env}`,
      orderBy: "DESC",
      minAmountThreshold: 0.0001,
    });

  for (const vault of vaults) {
    await System.tryCatch(handleVault)(crypto, vault);
  }
}

async function handleVault(crypto: CryptoInfo, vault: VaultAccountResponse) {
  const asset = vault.assets?.find((x) => x.id === crypto.assetId);

  if (!asset) {
    return;
  }

  const cryptoAmount = Number.parseFloat(asset.total);

  // dont sweep gas
  if (crypto.kind === "ETH" && cryptoAmount < 0.011) {
    return;
  }
  if (crypto.kind === "TRX" && cryptoAmount < 65) {
    return;
  }

  let feeAmount;

  try {
    const fees = await Cryptos.estimateFee({
      kind: crypto.kind,
      amount: asset.total,
      source: {
        type: PeerType.VAULT_ACCOUNT,
        id: vault.id,
      },
      destination: {
        type: PeerType.VAULT_ACCOUNT,
        id: config.fireblocksOmnibusId,
      },
    });

    feeAmount = fees.feeAmount;
  } catch (err) {
    console.log(">> Account Estimate Fee:");
    console.log({
      cryptoKind: crypto.kind,
      cryptoAmount,
      vaultId: vault.id,
      vaultName: vault.name,
    });
    throw err;
  }

  if (feeAmount / cryptoAmount > 0.03) {
    return;
  }

  try {
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
  } catch (err) {
    console.log(">> Account Create Tx:");
    console.log({
      cryptoKind: crypto.kind,
      cryptoAmount,
      feeAmount,
      vaultId: vault.id,
      vaultName: vault.name,
    });
    throw err;
  }
}
