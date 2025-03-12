import type { TransactionDocument } from "../transactions/TransactionDocument";

export type SkinWithdraw = TransactionDocument & { kind: "withdraw-skin" };
