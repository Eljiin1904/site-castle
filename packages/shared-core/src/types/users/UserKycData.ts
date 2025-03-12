import type { Birthday } from "../utility/Birthday";

export interface UserKycData {
  tier: number;
  firstName?: string;
  lastName?: string;
  dob?: Birthday;
  address?: string;
  city?: string;
  state?: string;
  country?: { name: string; code: string };
  zipCode?: string;
  occupation?: string;
}
