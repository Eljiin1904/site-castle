import { SvgBan } from "#app/svgs/notifications/SvgBan";
import { SvgChatMute } from "#app/svgs/notifications/SvgChatMute";
import { SvgDeposit } from "#app/svgs/notifications/SvgDeposit";
import { SvgRain } from "#app/svgs/notifications/SvgRain";
import { SvgWithdraw } from "#app/svgs/notifications/SvgWithdraw";
import { NotificationDocument } from "@core/types/notifications/NotificationDocument";

export function getIcon(n: NotificationDocument) {
  switch (n.kind) {
    case "chat-mute": {
      return SvgChatMute;
    }
    case "chat-message-delete": {
      return SvgChatMute;
    }
    case "suspension": {
      return SvgBan;
    }
    case "ban": {
      return SvgBan;
    }
    case "crypto-deposit-confirmed": {
      return SvgDeposit;
    }
    case "crypto-deposit-pending": {
      return SvgDeposit;
    }
    case "crypto-withdraw-cancelled": {
      return SvgWithdraw;
    }
    case "crypto-withdraw-sent": {
      return SvgWithdraw;
    }
    case "rain-complete": {
      return SvgRain;
    }
    case "skin-deposit-confirmed": {
      return SvgDeposit;
    }
    case "skin-deposit-cancelled": {
      return SvgDeposit;
    }
    case "skin-deposit-sent": {
      return SvgDeposit;
    }
    case "skin-withdraw-confirmed": {
      return SvgWithdraw;
    }
    case "skin-withdraw-cancelled": {
      return SvgWithdraw;
    }
    case "skin-withdraw-sent": {
      return SvgWithdraw;
    }
    case "swapped-deposit": {
      return SvgDeposit;
    }
    case "token-credit": {
      return SvgDeposit;
    }
    case "token-debit": {
      return SvgDeposit;
    }
    case "tip-receive": {
      return SvgDeposit;
    }
  }
}