import { TransactionStatus } from "@core/types/transactions/TransactionStatus";

export function getStatusColor(status: TransactionStatus): Color {
  switch (status) {
    case "cancelled":
      return "dark-sand";
    case "completed":
      return "bright-green";
    case "pending":
      return "orange";
    case "processing":
      return "orange";
    case "failed":
      return "double-red";
  }
}
