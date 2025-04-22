import { Http } from "@client/services/http";

export function updateSumsubApplicantData(data: {
  userId: string;
}): Promise<{}> {
  return Http.post("/verification/update-sumsub-applicant-data", data);
}
