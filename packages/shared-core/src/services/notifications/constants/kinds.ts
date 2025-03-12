import { NotificationKind } from "#core/types/notifications/NotificationKind";

const kindMap: Record<NotificationKind, boolean> = {
  ban: true,
  "chat-message-delete": true,
  "chat-mute": true,
  "crypto-deposit-confirmed": true,
  "crypto-deposit-pending": true,
  "crypto-withdraw-cancelled": true,
  "crypto-withdraw-sent": true,
  "rain-complete": true,
  "skin-deposit-confirmed": true,
  "skin-deposit-cancelled": true,
  "skin-deposit-sent": true,
  "skin-withdraw-confirmed": true,
  "skin-withdraw-cancelled": true,
  "skin-withdraw-sent": true,
  "swapped-deposit": true,
  suspension: true,
  "tip-receive": true,
  "token-credit": true,
  "token-debit": true,
};

export const kinds = Object.keys(kindMap) as NotificationKind[];
