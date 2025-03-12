import { Http } from "@client/services/http";

export function editReferral(data: {
  userId: string;
  referralCode: string | undefined;
}) {
  return Http.post("/users/edit-referral", data);
}
