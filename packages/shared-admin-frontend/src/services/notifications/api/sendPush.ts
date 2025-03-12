import { Http } from "@client/services/http";

export function sendPush(data: { title: string; body: string }) {
  return Http.post("/notifications/send-push", data);
}
