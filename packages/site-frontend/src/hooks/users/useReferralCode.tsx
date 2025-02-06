import { useLocalStorage } from "usehooks-ts";

export function useReferralCode() {
  return useLocalStorage("referral-code", "");
}
