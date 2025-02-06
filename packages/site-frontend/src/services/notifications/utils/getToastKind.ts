import { NotificationDocument } from "@core/types/notifications/NotificationDocument";
import { ToastInfo } from "@client/types/toasts/ToastInfo";

export function getToastKind(n: NotificationDocument): ToastInfo["kind"] {
  switch (n.kind) {
    case "chat-mute":
      return "warning";
    case "chat-message-delete":
      return "warning";
    case "suspension":
      return "warning";
    case "ban":
      return "warning";
    case "crypto-deposit-confirmed":
      return "success";
    case "crypto-deposit-pending":
      return "info";
    case "crypto-withdraw-cancelled":
      return "info";
    case "crypto-withdraw-sent":
      return "success";
    case "rain-complete":
      return "success";
    case "skin-deposit-confirmed":
      return "success";
    case "skin-deposit-cancelled":
      return "info";
    case "skin-deposit-sent":
      return "info";
    case "skin-withdraw-confirmed":
      return "success";
    case "skin-withdraw-cancelled":
      return "info";
    case "skin-withdraw-sent":
      return "info";
    case "swapped-deposit":
      return "success";
    case "token-credit":
      return "success";
    case "token-debit":
      return "warning";
    case "tip-receive":
      return "success";
  }
}
