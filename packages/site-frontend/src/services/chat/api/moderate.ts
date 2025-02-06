import { Http } from "@client/services/http";
import { UserMuteReason } from "@core/types/users/UserMuteData";

export function moderate(data: {
  messageId: string;
  deleteMessage: boolean;
  muteUser: boolean;
  reason?: UserMuteReason;
  endDate?: Date;
}): Promise<void> {
  return Http.post("/chat/moderate", data);
}
