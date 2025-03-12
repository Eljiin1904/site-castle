import { Http } from "@client/services/http";
import { UserMuteReason } from "@core/types/users/UserMuteData";

export function editMute(data: {
  userId: string;
  enabled: boolean;
  reason?: UserMuteReason;
  endDate?: Date;
}) {
  return Http.post("/users/edit-mute", data);
}
