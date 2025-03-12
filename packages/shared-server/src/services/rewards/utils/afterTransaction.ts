import { TransactionDocument } from "@core/types/transactions/TransactionDocument";
import { Site } from "#server/services/site";
import { Database } from "#server/services/database";

export async function afterTransaction(tx: TransactionDocument) {
  await handleHoliday(tx);
}

async function handleHoliday(tx: TransactionDocument) {
  if (tx.user.tags.includes("sponsored")) {
    return;
  }

  const { holiday } = await Site.meta.cache();

  if (!holiday) {
    return;
  }

  if ("bet" in tx) {
    const currencyAmount = Math.floor(tx.bet.xp * holiday.currencyRate);

    await Database.collection("users").updateOne(
      { _id: tx.user.id },
      {
        $inc: {
          holidayBalance: currencyAmount,
        },
      },
    );
  }
}
