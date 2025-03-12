import type { categories } from "#core/services/transactions/Transactions";

export type TransactionCategory = (typeof categories)[number];
