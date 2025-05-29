import { Http } from "@client/services/http";
import { BlackjackApiResponse } from "#core/types/blackjack/BlackjackApiResponse";

export default async function ({
  cardAbbrevAr,
}: {
  cardAbbrevAr: string[];
}): Promise<BlackjackApiResponse> {
  return Http.post("/blackjack/mock-cards", { cardAbbrevAr });
}
