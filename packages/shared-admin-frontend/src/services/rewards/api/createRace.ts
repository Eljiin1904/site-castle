import { Http } from "@client/services/http";

export function createRace(data: {
  displayName: string;
  payouts: number[];
  startDate: Date;
  endDate: Date;
}) {
  return Http.post("/rewards/create-race", data);
}
