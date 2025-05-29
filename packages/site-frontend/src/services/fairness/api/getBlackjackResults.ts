import { MinesResult } from "@core/types/mines/MinesResult";
import { Http } from "@client/services/http";
import { BlackjackFairnessResult } from "@core/types/blackjack/BlackjackFairnessDocument";
// import { BlackjackFairnessResult } from "@core/types/blackjack/BlackjackFairnessResult";

export function getBlackjackResults(data: { limit: number; page: number }): Promise<{
  results: BlackjackFairnessResult[];
}> {
  return Http.post("/fairness/get-blackjack-results", data);
}
