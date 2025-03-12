import type { statuses } from "#core/services/transactions/Transactions";

export type TransactionStatus = (typeof statuses)[number];
