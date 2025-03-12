import { isAxiosError } from "axios";
import { FeeLevel, PeerType } from "fireblocks-sdk";
import { BasicUser } from "@core/types/users/BasicUser";
import { Cryptos } from "@core/services/cryptos";
import { Database } from "#server/services/database";
import { HandledError } from "#server/services/errors";
import config from "#server/config";
import { fireblocks } from "./fireblocks";
import { cancelWithdraw } from "./cancelWithdraw";

export async function approveWithdraw({
  transactionId,
  approvedBy,
}: {
  transactionId: string;
  approvedBy: "auto" | BasicUser;
}) {
  const transaction = await Database.collection(
    "transactions",
  ).findOneAndUpdate(
    {
      _id: transactionId,
      status: "pending",
    },
    {
      $set: {
        status: "processing",
        approvedBy,
        approvedDate: new Date(),
      },
    },
  );

  if (!transaction || transaction.kind !== "withdraw-crypto") {
    return;
  }

  const crypto = Cryptos.getInfo(transaction.cryptoKind);

  try {
    await fireblocks().createTransaction({
      assetId: crypto.assetId,
      amount: crypto.isToken
        ? transaction.cryptoAmount - transaction.feeAmount
        : transaction.cryptoAmount,
      source: {
        type: PeerType.VAULT_ACCOUNT,
        id: config.fireblocksWithdrawId,
      },
      destination: {
        type: PeerType.ONE_TIME_ADDRESS,
        oneTimeAddress: { address: transaction.destinationAddress },
      },
      externalTxId: transaction._id,
      note: `Withdraw_${config.env}_${transaction.user.id}`,
      treatAsGrossAmount: !crypto.isToken,
      failOnLowFee: true,
      feeLevel: FeeLevel.HIGH,
    });
  } catch (err) {
    if (isAxiosError(err)) {
      console.error(`AxiosError: ${err.message}`);
      console.error(err.response?.data);
    } else {
      console.error(err);
    }

    await cancelWithdraw({
      transactionId: transaction._id,
      cancelReason: "Failed to create external transaction.",
    });

    throw new HandledError(
      "Failed to create external transaction. Withdraw refunded.",
    );
  }
}
