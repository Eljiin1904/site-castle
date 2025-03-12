import { Http } from "@client/services/http";

export function editBoostEvent(data: {
  eventId: string;
  startDate: Date;
  endDate: Date;
}): Promise<void> {
  return Http.post("/rewards/edit-boost-event", data);
}
