import type { creditAdjustments } from "#core/services/admin/Admin";

export type AdminCreditAdjustment = (typeof creditAdjustments)[number];
