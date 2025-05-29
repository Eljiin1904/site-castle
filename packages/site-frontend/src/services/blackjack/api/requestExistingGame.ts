import { Http } from "@client/services/http";
import { BlackjackApiResponse } from "#core/types/blackjack/BlackjackApiResponse";

export default async function (): Promise<BlackjackApiResponse> {
  return Http.get("/blackjack/get-existing-game");
}
