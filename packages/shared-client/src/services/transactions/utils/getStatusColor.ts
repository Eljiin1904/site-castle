import { TransactionStatus } from "@core/types/transactions/TransactionStatus";

export function getStatusColor(status: TransactionStatus): Color {
  switch (status) {
    case "cancelled":
      return "gray";
    case "completed":
      return "green";
    case "pending":
      return "orange";
    case "processing":
      return "orange";
  }
}
