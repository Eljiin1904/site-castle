import { Birthday } from "@core/types/utility/Birthday";
import { Http } from "@client/services/http";

export function verifyTier1(data: {
  firstName: string;
  lastName: string;
  dob: Birthday;
  address: string;
  city: string;
  state: string;
  countryIndex: number;
  zipCode: string;
  occupation: string;
}): Promise<void> {
  return Http.post("/users/verify-tier-1", data);
}
