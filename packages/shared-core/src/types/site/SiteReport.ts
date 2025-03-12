import type { TransactionReport } from "../transactions/TransactionReport";
import type { UserGlobalReport } from "../users/UserGlobalReport";

export interface SiteReport {
  transactions: TransactionReport;
  users: UserGlobalReport;
}
