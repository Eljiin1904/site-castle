import type { channels } from "#core/services/chat/Chat";

export type ChatChannel = (typeof channels)[number];
