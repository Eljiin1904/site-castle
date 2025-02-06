import { Http } from "@client/services/http";

export function joinRain(data: {
  rainId: string;
  captchaToken: string;
}): Promise<void> {
  return Http.post("/chat/join-rain", data);
}
