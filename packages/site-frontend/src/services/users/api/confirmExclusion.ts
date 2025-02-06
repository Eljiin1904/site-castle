import { Http } from "@client/services/http";

export function confirmExclusion(data: {
  confirmToken: string;
}): Promise<void> {
  return Http.post("/users/confirm-exclusion", data);
}
