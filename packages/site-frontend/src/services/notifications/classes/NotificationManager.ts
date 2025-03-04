import { NotificationDocument } from "@core/types/notifications/NotificationDocument";
import { NotificationKind } from "@core/types/notifications/NotificationKind";
import { EventEmitter } from "@client/services/utility";

/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
export declare interface NotificationManager extends EventEmitter {
  on<K extends NotificationKind>(
    event: K,
    listener: (x: NotificationDocument & { kind: K }) => void,
  ): this;
  off<K extends NotificationKind>(
    event: K,
    listener: (x: NotificationDocument & { kind: K }) => void,
  ): this;
  emit<K extends NotificationKind>(event: K, x: NotificationDocument & { kind: K }): boolean;
}

export class NotificationManager extends EventEmitter {}
/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
