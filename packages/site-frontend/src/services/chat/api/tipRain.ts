import { Http } from "@client/services/http";

export function tipRain(data: {
  rainId: string;
  tipAmount: number;
}): Promise<void> {
  return Http.post("/chat/tip-rain", data);
}
