import type { CaseBattleDocument } from "../case-battles/CaseBattleDocument";
import type { DatabaseStreamEvent, StreamUpdate } from "../database/DatabaseStreamEvent";
import type { DoubleInitialState } from "../double/DoubleInitialState";
import type { DoubleRoundDocument } from "../double/DoubleRoundDocument";
import type { DoubleTicketDocument } from "../double/DoubleTicketDocument";
import type { LimboInitialState } from "../limbo/LimboInitialState";
import type { LimboTicketDocument } from "../limbo/LimboTicketDocument";
import type { NotificationDocument } from "../notifications/NotificationDocument";
import type { DiceInitialState } from "../dice/DiceInitialState";
import type { DiceTicketDocument } from "../dice/DiceTicketDocument";
import type { UserUpdate } from "../users/UserUpdate";
import type { SiteMetaId, SiteMetaObject, SiteMetaValue } from "../site/SiteMetaDocument";
import type {
  SiteSettingId,
  SiteSettingObject,
  SiteSettingValue,
} from "../site/SiteSettingDocument";
import type { HolidayInitialState } from "../rewards/HolidayInitialState";
import type { SiteActivityDocument } from "../site/SiteActivityDocument";
import type { SiteBetDocument } from "../site/SiteBetDocument";
import { HotSiteGameDetails } from "../site/HotSiteGame";

export interface SiteServerEvents {
  "activity-feed-init": (x: SiteActivityDocument[]) => void;
  "activity-feed-insert": (x: SiteActivityDocument) => void;
  "bet-feed-init": (x: SiteBetDocument[]) => void;
  "bet-feed-insert": (x: SiteBetDocument) => void;
  "case-battle-index-init": (battles: CaseBattleDocument[]) => void;
  "case-battle-index-insert": (battle: CaseBattleDocument) => void;
  "case-battle-index-update": (update: any) => void;
  "case-battle-index-stats": (count: number, value: number) => void;
  "case-battle-player-init": (battle: CaseBattleDocument) => void;
  "case-battle-player-stream": (update: any) => void;
  "chat-stream": (e: DatabaseStreamEvent<"chat-messages">) => void;
  "chat-rain-stream": (e: DatabaseStreamEvent<"chat-rains">) => void;
  "chest-drops-stream": (e: DatabaseStreamEvent<"chest-drops">) => void;
  "dice-init": (x: DiceInitialState) => void;
  "dice-insert": (ticket: DiceTicketDocument) => void;
  "double-init": (x: DoubleInitialState) => void;
  "double-round-insert": (round: DoubleRoundDocument) => void;
  "double-round-update": (update: StreamUpdate) => void;
  "double-bet-insert": (bet: DoubleTicketDocument) => void;
  "holiday-init": (x: HolidayInitialState) => void;
  "holiday-race-update": (update: StreamUpdate) => void;
  "hot-feed-init": (x: HotSiteGameDetails[]) => void;
  "hot-feed-update": (x: HotSiteGameDetails[]) => void;
  "holiday-raffle-update": (update: StreamUpdate) => void;
  "limbo-init": (x: LimboInitialState) => void;
  "limbo-insert": (bet: LimboTicketDocument) => void;
  "notifications-init": (notifications: NotificationDocument[]) => void;
  "notifications-insert": (notification: NotificationDocument) => void;
  "notifications-update": (update: StreamUpdate) => void;
  "notifications-delete": (documentId: string) => void;
  "site-meta-init": (obj: SiteMetaObject) => void;
  "site-meta-update": (key: SiteMetaId, value: SiteMetaValue) => void;
  "site-settings-init": (obj: SiteSettingObject) => void;
  "site-settings-update": (key: SiteSettingId, value: SiteSettingValue) => void;
  "site-time": (time: number) => void;
  "user-update": (update: UserUpdate) => void;
}
