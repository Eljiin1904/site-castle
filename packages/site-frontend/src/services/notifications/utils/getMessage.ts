import { isPast } from "date-fns";
import { Intimal } from "@core/services/intimal";
import { Strings } from "@core/services/strings";
import { NotificationDocument } from "@core/types/notifications/NotificationDocument";

export function getMessage(n: NotificationDocument): string {
  switch (n.kind) {
    case "chat-mute": {
      if (!n.endDate || isPast(n.endDate)) {
        return "You were unmuted by a moderator.";
      } else {
        return "You were muted by a moderator.";
      }
    }
    case "chat-message-delete": {
      return "One of your chat messages was removed by a moderator.";
    }
    case "suspension": {
      return `You have been suspended, reason: ${Strings.kebabToTitle(n.reason)}`;
    }
    case "ban": {
      return `You have been banned, reason: ${Strings.kebabToTitle(n.reason)}`;
    }
    case "crypto-deposit-confirmed": {
      return `Your crypto deposit was confirmed. You were credited ${Intimal.toLocaleString(n.tokenAmount)} tokens.`;
    }
    case "crypto-deposit-pending": {
      return "Your crypto deposit was seen on the network. You will be credited once it's confirmed.";
    }
    case "crypto-withdraw-cancelled": {
      return `Your crypto withdraw was cancelled. You were refunded ${Intimal.toLocaleString(n.tokenAmount)} tokens.`;
    }
    case "crypto-withdraw-sent": {
      return "Your crypto withdraw was sent.";
    }
    case "rain-complete": {
      return `Chat rain complete. You received ${Intimal.toLocaleString(n.tokenAmount)} tokens.`;
    }
    case "skin-deposit-confirmed": {
      return `Your ${Strings.kebabToTitle(n.provider)} deposit was confirmed. You were credited ${Intimal.toLocaleString(n.tokenAmount)} tokens.`;
    }
    case "skin-deposit-cancelled": {
      return `Your ${Strings.kebabToTitle(n.provider)} deposit failed.`;
    }
    case "skin-deposit-sent": {
      return `Your skin deposit trade was sent. Please accept offer ${n.tradeOfferId} to complete your deposit.`;
    }
    case "skin-withdraw-confirmed": {
      return "Your skin withdraw was confirmed.";
    }
    case "skin-withdraw-cancelled": {
      return `Your skin withdraw was cancelled. You were refunded ${Intimal.toLocaleString(n.tokenAmount)} tokens.`;
    }
    case "skin-withdraw-sent": {
      return `Your skin withdraw trade was sent. Please accept offer ${n.tradeOfferId} to complete your withdraw.`;
    }
    case "swapped-deposit": {
      return `Your Swapped deposit was confirmed. You were credited ${Intimal.toLocaleString(n.tokenAmount)} tokens.`;
    }
    case "token-credit": {
      return `You were credited ${Intimal.toLocaleString(n.amount)} tokens by an admin.`;
    }
    case "token-debit": {
      return `You were debited ${Intimal.toLocaleString(n.amount)} tokens by an admin.`;
    }
    case "tip-receive": {
      return `You were tipped ${Intimal.toLocaleString(n.amount)} tokens by ${n.sender.name}.`;
    }
  }
}
