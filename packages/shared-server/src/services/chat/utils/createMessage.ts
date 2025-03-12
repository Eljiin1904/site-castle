import { ChatChannel } from "@core/types/chat/ChatChannel";
import { ChatAgentData } from "@core/types/chat/ChatAgent";
import { ChatMessageKindData } from "@core/types/chat/ChatMessageKind";
import { ChatMessageDocument } from "@core/types/chat/ChatMessageDocument";
import { Database } from "#server/services/database";
import { Ids } from "#server/services/ids";

type CreateOptions = {
  channel: ChatChannel | null;
} & ChatAgentData &
  ChatMessageKindData;

export async function createMessage(options: CreateOptions) {
  const message: ChatMessageDocument = {
    _id: Ids.object(),
    timestamp: new Date(),
    ...options,
  };

  await Database.collection("chat-messages").insertOne(message);

  return message;
}
