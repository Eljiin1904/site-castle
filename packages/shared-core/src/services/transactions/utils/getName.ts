import { Strings } from "#core/services/strings";
import { TransactionDocument } from "#core/types/transactions/TransactionDocument";

export function getName(tx: TransactionDocument): string {
  switch (tx.kind) {
    case "admin-token-credit":
      return "Admin - Credit Tokens";
    case "admin-token-debit":
      return "Admin - Debit Tokens";
    case "affiliate-commission-claim":
      return "Affiliates - Claim Commission";
    case "affiliate-reload-claim":
      return "Affiliates - Claim Reload";
    case "case-battle-join":
      return "Case Battles - Join";
    case "case-battle-won":
      return "Case Battles - Won";
    case "case-item-won":
      return "Cases - Item Won";
    case "case-spin":
      return "Cases - Spin";
    case "deposit-crypto":
      return `Deposit Crypto - ${tx.cryptoKind.replace("_", " ")}`;
    case "deposit-gift-card":
      return `Deposit Gift Card - ${tx.tag === "g2a" ? "G2A" : Strings.kebabToTitle(tx.tag)}`;
    case "deposit-skin":
      return `Deposit Skin - ${Strings.kebabToTitle(tx.provider)}`;
    case "deposit-swapped":
      return "Deposit Swapped";
    case "dice-bet":
      return "Dice - Bet";
    case "dice-won":
      return "Dice - Won";
    case "double-bet":
      return "Double - Bet";
    case "double-jackpot-won":
      return "Double - Jackpot Won";
    case "double-won":
      return "Double - Won";
    case "limbo-bet":
      return "Limbo - Bet";
    case "limbo-won":
      return "Limbo - Won";
    case "promotion-card-redeem":
      return "Promotions - Redeem Card";
    case "promotion-code-redeem":
      return "Promotions - Redeem Code";
    case "reward-advent-item":
      return "Rewards - Advent Drop";
    case "reward-claim":
      return `Rewards - Claim ${Strings.kebabToTitle(tx.claimKind)}`;
    case "rain-payout":
      return "Rain - Payout";
    case "rain-tip":
      return "Rain - Tip";
    case "reward-boost":
      return `Rewards - ${Strings.capitalize(tx.timeframe)} Boost`;
    case "reward-gem-case-item":
      return "Rewards - Gem Case Drop";
    case "reward-holiday-case-item":
      return "Rewards - Holiday Case Drop";
    case "reward-level-case-item":
      return "Rewards - Level Case Drop";
    case "reward-token-pack":
      return "Rewards - Gems for Tokens";
    case "tip-receive":
      return "Tips - Receive Tip";
    case "tip-send":
      return "Tips - Send Tip";
    case "withdraw-crypto":
      return `Withdraw Crypto - ${tx.cryptoKind.replace("_", " ")}`;
    case "withdraw-skin":
      return `Withdraw Skin - ${Strings.kebabToTitle(tx.provider)}`;
    case "vault-deposit":
      return "Vault - Deposit";
    case "vault-withdraw":
      return "Vault - Withdraw";
  }
}
