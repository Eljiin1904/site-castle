import type { CryptoKind } from "../cryptos/CryptoKind";
import type { UserBanReason } from "../users/UserBanData";
import type { UserSuspensionReason } from "../users/UserSuspensionData";
import type { UserMuteReason } from "../users/UserMuteData";
import type { BasicUser } from "../users/BasicUser";
import type { MarketProvider } from "../market/MarketProvider";

export type NotificationKind = NotificationKindData["kind"];

export type NotificationKindData =
  | BanData
  | ChatMessageDeleteData
  | ChatMuteData
  | CryptoDepositPendingData
  | CryptoDepositConfirmedData
  | CryptoWithdrawCancelledData
  | CryptoWithdrawSentData
  | RainCompleteData
  | SkinDepositConfirmedData
  | SkinDepositCancelledData
  | SkinDepositSentData
  | SkinWithdrawConfirmedData
  | SkinWithdrawCancelledData
  | SkinWithdrawSentData
  | SumsubReviewResultData
  | SwappedDepositData
  | SuspensionData
  | TipReceiveData
  | TokenCreditData
  | TokenDebitData;

interface BanData {
  kind: "ban";
  reason: UserBanReason;
  endDate: Date;
}

interface ChatMessageDeleteData {
  kind: "chat-message-delete";
}

interface ChatMuteData {
  kind: "chat-mute";
  reason: UserMuteReason;
  endDate: Date;
}

interface CryptoDepositPendingData {
  kind: "crypto-deposit-pending";
  cryptoKind: CryptoKind;
  cryptoAmount: number;
  tokenAmount: number;
}

interface CryptoDepositConfirmedData {
  kind: "crypto-deposit-confirmed";
  transactionId: string;
  cryptoKind: CryptoKind;
  cryptoAmount: number;
  tokenAmount: number;
  ftd: boolean;
}

interface CryptoWithdrawCancelledData {
  kind: "crypto-withdraw-cancelled";
  cryptoKind: CryptoKind;
  cryptoAmount: number;
  tokenAmount: number;
}

interface CryptoWithdrawSentData {
  kind: "crypto-withdraw-sent";
  transactionId: string;
  cryptoKind: CryptoKind;
  cryptoAmount: number;
  tokenAmount: number;
}

interface RainCompleteData {
  kind: "rain-complete";
  tokenAmount: number;
}

interface SkinDepositConfirmedData {
  kind: "skin-deposit-confirmed";
  provider: MarketProvider;
  transactionId: string;
  tokenAmount: number;
  ftd: boolean;
}

interface SkinDepositCancelledData {
  kind: "skin-deposit-cancelled";
  provider: MarketProvider;
  tokenAmount: number;
}

interface SkinDepositSentData {
  kind: "skin-deposit-sent";
  tradeOfferId: string;
}

interface SkinWithdrawConfirmedData {
  kind: "skin-withdraw-confirmed";
  provider: MarketProvider;
  tokenAmount: number;
}

interface SkinWithdrawCancelledData {
  kind: "skin-withdraw-cancelled";
  provider: MarketProvider;
  tokenAmount: number;
  reason: string;
}

interface SkinWithdrawSentData {
  kind: "skin-withdraw-sent";
  tradeOfferId: string;
}

interface SumsubReviewResultData {
  kind: "sumsub-review-result";
  verified: boolean;
}

interface SwappedDepositData {
  kind: "swapped-deposit";
  transactionId: string;
  tokenAmount: number;
  ftd: boolean;
}

interface SuspensionData {
  kind: "suspension";
  reason: UserSuspensionReason;
  endDate: Date;
}

interface TipReceiveData {
  kind: "tip-receive";
  sender: BasicUser;
  amount: number;
}

interface TokenCreditData {
  kind: "token-credit";
  amount: number;
}

interface TokenDebitData {
  kind: "token-debit";
  amount: number;
}
