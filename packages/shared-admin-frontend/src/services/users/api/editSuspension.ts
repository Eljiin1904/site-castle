import { Http } from "@client/services/http";
import { UserSuspensionReason } from "@core/types/users/UserSuspensionData";

export function editSuspension(data: {
  userId: string;
  enabled: boolean;
  reason?: UserSuspensionReason;
  endDate?: Date;
}) {
  return Http.post("/users/edit-suspension", data);
}
