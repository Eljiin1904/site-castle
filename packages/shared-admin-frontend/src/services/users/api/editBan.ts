import { Http } from "@client/services/http";
import { UserBanReason } from "@core/types/users/UserBanData";

export function editBan(data: {
  userId: string;
  enabled: boolean;
  reason?: UserBanReason;
  endDate?: Date;
}) {
  return Http.post("/users/edit-ban", data);
}
