import type { AffiliateReloadDocument } from "../affiliates/AffiliateReloadDocument";
import type { ChatMessageDocument } from "../chat/ChatMessageDocument";
import type { BasicChest } from "../chests/BasicChest";
import type { GiftBatchDocument } from "../economy/GiftBatchDocument";
import type { PromotionCodeDocument } from "../economy/PromotionCodeDocument";
import type { RaceDocument } from "../rewards/RaceDocument";
import type { RaffleDocument } from "../rewards/RaffleDocument";
import type { RewardBoostEventDocument } from "../rewards/RewardBoostEventDocument";
import type { RewardProductDocument } from "../rewards/RewardProductDocument";
import type { BasicUser } from "../users/BasicUser";
import type { UserBanReason } from "../users/UserBanData";
import type { UserSuspensionReason } from "../users/UserSuspensionData";
import type { UserMuteReason } from "../users/UserMuteData";
import type { UserRole } from "../users/UserRole";
import type { UserTag } from "../users/UserTag";
import type { AdminCreditAdjustment } from "./AdminCreditAdjustment";
import type { AdminDebitAdjustment } from "./AdminDebitAdjustment";
import type { UserReferral } from "../users/UserReferral";
import type {
  SiteSettingObject,
  SiteSettingValue,
} from "../site/SiteSettingDocument";
import type { HolidayEventDocument } from "../rewards/HolidayEventDocument";

export type AdminLogKind = AdminLogKindData["kind"];

export type AdminLogKindData =
  | AffiliateBaseTierData
  | AffiliateKeyCreateData
  | AffiliateKeyDisableData
  | AffiliateReloadCreateData
  | AffiliateReloadEditData
  | ChatDeleteData
  | ChestCreateData
  | ChestDisableData
  | ChestEnableData
  | ChestUpdateData
  | CryptoDepositConfirmData
  | CryptoWithdrawApproveData
  | CryptoWithdrawCancelData
  | GiftBatchCreateData
  | HolidayCreateData
  | PromotionCodeCancelData
  | PromotionCodeCreateData
  | RaceCreateData
  | RaffleCreateData
  | RewardBoostEventCreateData
  | RewardBoostEventEditData
  | RewardProductCreateData
  | RewardProductEditData
  | SettingEditData
  | SkinWithdrawApproveData
  | SkinWithdrawCancelData
  | TokenCreditData
  | TokenDebitData
  | UserAuthenticatorDisableData
  | UserBanData
  | UserEmailData
  | UserMuteData
  | UserNameData
  | UserReferralData
  | UserRoleData
  | UserSuspensionData
  | UserTagsData
  | UserTipLimitData;

interface AffiliateBaseTierData {
  kind: "affiliate-base-tier";
  user: BasicUser;
  baseTier: number | undefined;
}

interface AffiliateKeyCreateData {
  kind: "affiliate-key-create";
  keyId: string;
}

interface AffiliateKeyDisableData {
  kind: "affiliate-key-disable";
  keyId: string;
}

interface AffiliateReloadCreateData {
  kind: "affiliate-reload-create";
  reload: AffiliateReloadDocument;
}

interface AffiliateReloadEditData {
  kind: "affiliate-reload-edit";
  reload: AffiliateReloadDocument;
}

interface ChatDeleteData {
  kind: "chat-delete";
  message: ChatMessageDocument;
}

interface ChestCreateData {
  kind: "chest-create";
  chest: BasicChest;
}

interface ChestDisableData {
  kind: "chest-disable";
  chest: BasicChest;
}

interface ChestEnableData {
  kind: "chest-enable";
  chest: BasicChest;
}

interface ChestUpdateData {
  kind: "chest-update";
  chest: BasicChest;
}

interface CryptoDepositConfirmData {
  kind: "crypto-deposit-confirm";
  transactionId: string;
}

interface CryptoWithdrawApproveData {
  kind: "crypto-withdraw-approve";
  transactionId: string;
}

interface CryptoWithdrawCancelData {
  kind: "crypto-withdraw-cancel";
  transactionId: string;
}

interface GiftBatchCreateData {
  kind: "gift-batch-create";
  batch: GiftBatchDocument;
}

interface HolidayCreateData {
  kind: "holiday-create";
  holiday: HolidayEventDocument;
}

interface PromotionCodeCancelData {
  kind: "promotion-code-cancel";
  promotionId: string;
}

interface PromotionCodeCreateData {
  kind: "promotion-code-create";
  promotion: PromotionCodeDocument;
}

interface RaceCreateData {
  kind: "race-create";
  race: RaceDocument;
}

interface RaffleCreateData {
  kind: "raffle-create";
  raffle: RaffleDocument;
}

interface RewardBoostEventCreateData {
  kind: "reward-boost-event-create";
  event: RewardBoostEventDocument;
}

interface RewardBoostEventEditData {
  kind: "reward-boost-event-edit";
  eventId: string;
}

interface RewardProductCreateData {
  kind: "reward-product-create";
  product: RewardProductDocument;
}

interface RewardProductEditData {
  kind: "reward-product-edit";
  productId: string;
}

interface SettingEditData {
  kind: "setting-edit";
  settingId: keyof SiteSettingObject;
  settingValue: SiteSettingValue;
}

interface SkinWithdrawApproveData {
  kind: "skin-withdraw-approve";
  transactionId: string;
}

interface SkinWithdrawCancelData {
  kind: "skin-withdraw-cancel";
  transactionId: string;
}

interface TokenCreditData {
  kind: "token-credit";
  user: BasicUser;
  amount: number;
  adjustment: AdminCreditAdjustment;
}

interface TokenDebitData {
  kind: "token-debit";
  user: BasicUser;
  amount: number;
  adjustment: AdminDebitAdjustment;
}

interface UserAuthenticatorDisableData {
  kind: "user-authenticator-disable";
  user: BasicUser;
}

interface UserBanData {
  kind: "user-ban";
  user: BasicUser;
  enabled: boolean;
  reason: UserBanReason | undefined;
  endDate: Date | undefined;
}

interface UserEmailData {
  kind: "user-email";
  user: BasicUser;
  newEmail: string;
}

interface UserMuteData {
  kind: "user-mute";
  user: BasicUser;
  reason: UserMuteReason | undefined;
  endDate: Date | undefined;
}

interface UserNameData {
  kind: "user-name";
  user: BasicUser;
  newName: string;
}

interface UserReferralData {
  kind: "user-referral";
  user: BasicUser;
  oldReferral: UserReferral | undefined;
  newReferral: UserReferral | undefined;
}

interface UserRoleData {
  kind: "user-role";
  user: BasicUser;
  newRole: UserRole;
}

interface UserSuspensionData {
  kind: "user-suspension";
  user: BasicUser;
  reason: UserSuspensionReason | undefined;
  endDate: Date | undefined;
}

interface UserTagsData {
  kind: "user-tags";
  user: BasicUser;
  newTags: UserTag[];
}

interface UserTipLimitData {
  kind: "user-tip-limit";
  user: BasicUser;
  tipLimit: number | undefined;
}
