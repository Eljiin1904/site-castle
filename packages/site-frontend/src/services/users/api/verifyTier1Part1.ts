import { Birthday } from "@core/types/utility/Birthday";
import { Http } from "@client/services/http";

export function verifyTier1Part1(data: {
  firstName: string;
  lastName: string;
  dob: Birthday;
}): Promise<void> {
  return Http.post("/users/verify-tier-1-part-1", data);
}
