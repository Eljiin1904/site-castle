import { TransactionCategory } from "#core/types/transactions/TransactionCategory";
import { TransactionKind } from "#core/types/transactions/TransactionKind";

export function getCategory(kind: TransactionKind) {
  return map[kind];
}

const map: Record<TransactionKind, TransactionCategory> = {
  "admin-token-credit": "other",
  "admin-token-debit": "other",
  "affiliate-commission-claim": "referrals",
  "affiliate-reload-claim": "referrals",
  "case-battle-join": "case-battles",
  "case-battle-won": "case-battles",
  "case-item-won": "cases",
  "case-spin": "cases",
  "deposit-crypto": "deposits",
  "deposit-gift-card": "deposits",
  "deposit-skin": "deposits",
  "deposit-swapped": "deposits",
  "dice-bet": "dice",
  "dice-won": "dice",
  "double-bet": "double",
  "double-jackpot-won": "double",
  "double-won": "double",
  "limbo-bet": "limbo",
  "limbo-won": "limbo",
  "promotion-card-redeem": "promotion",
  "promotion-code-redeem": "promotion",
  "rain-payout": "rain",
  "rain-tip": "rain",
  "reward-advent-item": "rewards",
  "reward-boost": "rewards",
  "reward-claim": "rewards",
  "reward-gem-case-item": "rewards",
  "reward-holiday-case-item": "rewards",
  "reward-level-case-item": "rewards",
  "reward-token-pack": "rewards",
  "tip-receive": "tips",
  "tip-send": "tips",
  "withdraw-crypto": "withdrawals",
  "withdraw-skin": "withdrawals",
  "vault-deposit": "vault",
  "vault-withdraw": "vault",
};
