import { CryptoKind } from "@core/types/cryptos/CryptoKind";
import { CryptoWalletDocument } from "@core/types/cryptos/CryptoWalletDocument";
import { Cryptos } from "@core/services/cryptos";
import { Database } from "#server/services/database";
import { Ids } from "#server/services/ids";
import config from "#server/config";
import { fireblocks } from "./fireblocks";

export async function getDepositAddress({
  userId,
  kind,
  rotate,
}: {
  userId: string;
  kind: CryptoKind;
  rotate: boolean;
}) {
  if (!rotate) {
    const existing = await Database.collection("crypto-wallets").findOne({
      userId,
      kind,
      rotated: { $exists: false },
    });

    if (existing) {
      return existing.address;
    }
  }

  const crypto = Cryptos.getInfo(kind);
  const walletType = crypto.walletType;

  let wallet;

  if (walletType === "utxo") {
    wallet = await fireblocks().generateNewAddress(
      config.fireblocksOmnibusId,
      crypto.assetId,
      `UserDeposit_${config.env}_${userId}`,
      userId,
    );
  } else {
    const vaultAccount = await fireblocks().createVaultAccount(
      `UserDeposit_${config.env}_${userId}`,
      false,
      userId,
      true,
    );
    wallet = await fireblocks().createVaultAsset(
      vaultAccount.id,
      crypto.assetId,
    );
  }

  await Database.collection("crypto-wallets").updateMany(
    {
      userId,
      kind,
    },
    { $set: { rotated: true } },
  );

  const document: CryptoWalletDocument = {
    _id: Ids.object(),
    timestamp: new Date(),
    userId,
    kind,
    assetId: crypto.assetId,
    address: wallet.address,
    legacyAddress: wallet.legacyAddress,
    tag: wallet.tag,
  };

  await Database.collection("crypto-wallets").insertOne(document);

  return wallet.address;
}
