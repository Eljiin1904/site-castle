import { UserDocument } from "@core/types/users/UserDocument";
import { RewardProductDocument } from "@core/types/rewards/RewardProductDocument";
import { Transactions } from "#server/services/transactions";
import { spendGems } from "./spendGems";

export async function buyProduct({
  user,
  product,
}: {
  user: UserDocument;
  product: RewardProductDocument;
}) {
  await spendGems({ user, amount: product.gemCost });

  if (product.kind === "tokens") {
    await Transactions.createTransaction({
      user,
      autoComplete: true,
      kind: "reward-token-pack",
      amount: product.tokenAmount,
      productId: product._id,
      gemAmount: product.gemCost,
    });
  } else {
    throw new Error("Invalid product kind.");
  }
}
