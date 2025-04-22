import axios, { isAxiosError } from "axios";
import { HandledError } from "#server/services/errors";
import { getSumsubAxiosConfig } from "./getSumsubAxiosConfig";

// https://docs.sumsub.com/reference/get-applicant-data-via-externaluserid

function getExternalApplicantStatus(applicantId: string) {
  const url = `/resources/applicants/-;externalUserId=${applicantId}/one`;
  return getSumsubAxiosConfig({ url, method: "get" });
}

export async function getSumsubApplicantData(userId: string) {
  let response;
  try {
    response = await axios(getExternalApplicantStatus(userId));
  } catch (err) {
    console.error(err);
    if (isAxiosError(err)) {
      throw new HandledError(
        `Failed to get Sumsub applicant data for userid ${userId}: ${err.response?.data.description}`,
      );
    }
    console.error(err);
    throw new HandledError(
      `Failed to get Sumsub applicant data for userid ${userId}.`,
    );
  }
  return response?.data;
}
