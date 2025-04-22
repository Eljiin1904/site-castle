import { SumsubApplicantDataDocument } from "@core/types/verification/SumsubApplicantDataDocument";
import { Http } from "@client/services/http";

export function getSumsubApplicantData(data: { userId: string }): Promise<{
  applicantData: SumsubApplicantDataDocument;
}> {
  return Http.post("/verification/get-sumsub-applicant-data", data);
}
