import { Http } from "@client/services/http";

export function setTipLimit(data: {
  userId: string;
  tipLimit: number | undefined;
}) {
  return Http.post("/users/set-tip-limit", data);
}
