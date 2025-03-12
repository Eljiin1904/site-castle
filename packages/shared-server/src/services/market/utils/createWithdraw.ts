import { MarketItem } from "@core/types/market/MarketItem";
import { UserDocument } from "@core/types/users/UserDocument";
import { Items } from "@core/services/items";
import { Transactions } from "#server/services/transactions";
import { Site } from "#server/services/site";
import { Users } from "#server/services/users";
import { Slack } from "#server/services/slack";
import { approveWithdraw } from "./approveWithdraw";

export async function createWithdraw({
  user,
  steamId,
  tradeUrl,
  item,
}: {
  user: UserDocument;
  steamId: string;
  tradeUrl: string;
  item: MarketItem;
}) {
  const settings = await Site.settings.cache();

  let autoApprove = true;

  if (user.tags.includes("cheeky")) {
    autoApprove = false;
  } else if (settings.manualSkinWithdraw) {
    autoApprove = false;
  } else if (item.usdValue > settings.skinWithdrawSingleMax) {
    autoApprove = false;
  } else {
    autoApprove = await Users.canApproveWithdraw({
      userId: user._id,
      withdrawAmount: item.tokenValue,
      limitUsd: settings.skinWithdrawDailyMax,
    });
  }

  const transaction = await Transactions.createTransaction({
    user,
    autoComplete: false,
    kind: "withdraw-skin",
    amount: -item.tokenValue,
    itemId: item.id,
    provider: item.provider,
    steamId,
    tradeUrl,
    item,
  });

  if (autoApprove) {
    await approveWithdraw({
      transactionId: transaction._id,
      approvedBy: "auto",
    });
  } else {
    await Slack.ping(
      `:bank: Withdraw pending for \`${Items.getName(item)} ($${item.usdValue.toFixed(2)})\` by \`${
        user.username
      }\`.`,
    );
  }
}
