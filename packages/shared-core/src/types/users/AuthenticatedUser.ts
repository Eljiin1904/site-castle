import type { UserDocument } from "./UserDocument";

type OmitKeys = "passwordHash" | "kyc" | "tfa" | "meta";

export interface AuthenticatedUser extends Omit<UserDocument, OmitKeys> {
  kyc: {
    tier: number;
  };
  tfa: {
    enabled: boolean | undefined;
  };
  meta: {
    lastMessageDate: Date | undefined;
    lastRainId: string | undefined;
    tipLimit: number | undefined;
    pendingReferralCode: string | undefined;
    reloadsEnabled: boolean | undefined;
    steamTradeUrl?: string;
    wagerRequirement: number | undefined;
  };
}
