import type { TransactionDocument } from "../transactions/TransactionDocument";

export type CryptoWithdraw = TransactionDocument & { kind: "withdraw-crypto" };
