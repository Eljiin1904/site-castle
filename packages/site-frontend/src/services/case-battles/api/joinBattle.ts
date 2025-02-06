import { Http } from "@client/services/http";

export function joinBattle(data: {
  battleId: string;
  seat: number;
  betToken: string | undefined;
}): Promise<void> {
  return Http.post("/case-battles/join-battle", data);
}
