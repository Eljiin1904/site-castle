import { ChatChannel } from "@core/types/chat/ChatChannel";
import { Http } from "@client/services/http";

export function sendMessage(data: {
  channel: ChatChannel;
  text: string;
  replyMessageId?: string;
}): Promise<void> {
  return Http.post("/chat/send-message", data);
}
