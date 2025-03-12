import type { ChatAgentData } from "./ChatAgent";
import type { ChatChannel } from "./ChatChannel";
import type { ChatMessageKindData } from "./ChatMessageKind";

export type ChatMessageDocument = {
  _id: string;
  timestamp: Date;
  channel: ChatChannel | null;
  hidden?: boolean;
} & ChatAgentData &
  ChatMessageKindData;
