import { Http } from "@client/services/http";

export function verifyTier1Part2(data: {
  address: string;
  city: string;
  state: string;
  countryIndex: number;
  zipCode: string;
}): Promise<void> {
  return Http.post("/users/verify-tier-1-part-2", data);
}
