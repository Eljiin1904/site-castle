import type { ChatChannel } from "../chat/ChatChannel";
import type { SiteBetScope } from "../site/SiteBetScope";

export interface SiteClientEvents {
  "activity-feed-join": () => void;
  "activity-feed-leave": () => void;
  "bet-feed-join": (scope: SiteBetScope) => void;
  "bet-feed-leave": (scope: SiteBetScope) => void;
  "case-battle-index-join": (limit: number) => void;
  "case-battle-index-leave": () => void;
  "case-battle-player-join": (battleId: string) => void;
  "case-battle-player-leave": (battleId: string) => void;
  "chat-join": (channel: ChatChannel) => void;
  "chat-leave": (channel: ChatChannel) => void;
  "chest-drops-join": (chestId: string) => void;
  "chest-drops-leave": (chestId: string) => void;
  "double-join": () => void;
  "double-leave": () => void;
  "dice-join": (userId: string) => void;
  "dice-leave": () => void;
  "holiday-join": () => void;
  "holiday-leave": () => void;
  "hot-feed-join": () => void;
  "hot-feed-leave": () => void;
  "limbo-join": (userId: string) => void;
  "limbo-leave": () => void;
  "notifications-join": () => void;
  "notifications-leave": () => void;
  "notifications-delete": () => void;
}
