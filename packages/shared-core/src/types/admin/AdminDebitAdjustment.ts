import type { debitAdjustments } from "#core/services/admin/Admin";

export type AdminDebitAdjustment = (typeof debitAdjustments)[number];
