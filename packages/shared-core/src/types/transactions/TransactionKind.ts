import type { AdminCreditAdjustment } from "../admin/AdminCreditAdjustment";
import type { AdminDebitAdjustment } from "../admin/AdminDebitAdjustment";
import type { ChatRainSplits } from "../chat/ChatRainSplits";
import type { BasicChest } from "../chests/BasicChest";
import type { ChestItem } from "../chests/ChestItem";
import type { CryptoKind } from "../cryptos/CryptoKind";
import type { DiceTargetKind } from "../dice/DiceTargetKind";
import type { DoubleBetKind } from "../double/DoubleBetKind";
import type { GiftCardTag } from "../economy/GiftCardTag";
import type { MarketProvider } from "../market/MarketProvider";
import type { LootItem } from "../items/BasicItem";
import type { RewardBoostTimeframe } from "../rewards/RewardBoostTimeframe";
import type { RewardClaimKind } from "../rewards/RewardClaimKind";
import type { BasicUser } from "../users/BasicUser";
import type { UserLocation } from "../users/UserLocation";
import type { MarketItem } from "../market/MarketItem";
import type { MarketInventoryItem } from "../market/MarketInventoryDocument";
import type { TransactionBetData } from "./TransactionBetData";
import { BlackjackBetTypeInsurance } from "../blackjack/BlackjackBetAmounts";
import { SidebetPayout } from "../blackjack/BlackjackApiResponse";

export type TransactionKind = TransactionKindData["kind"];

export type TransactionKindData =
  | AdminTokenCreditData
  | AdminTokenDebitData
  | AffiliateCampaignCommissionClaimData
  | AffiliateCommissionClaimData
  | AffiliateReloadClaimData
  | CaseBattleJoinData
  | CaseBattleWonData
  | CaseItemWonData
  | CaseSpinData
  | DepositCryptoData
  | DepositGiftCardData
  | DepositSkinData
  | DepositSwappedData
  | DiceBetData
  | DiceWonData
  | DoubleBetData
  | DoubleJackpotWonData
  | DoubleWonData
  | LimboBetData
  | LimboWonData
  | MinesBetData
  | MinesWonData
  | BlackjackBetData
  | BlackjackSidebetBetData
  | BlackjackWonData
  | BlackjackSidebetWonData
  | HubEightCreditData
  | HubEightDebitData
  | HubEightRollbackData
  | DuelBetData
  | DuelWonData
  | CrashBetData
  | CrashWonData
  | PromotionCardRedeemData
  | PromotionCodeRedeemData
  | RainPayoutData
  | RainTipData
  | RewardAdventItemData
  | RewardBoostData
  | RewardClaimData
  | RewardFaucetData
  | RewardDailyCaseWonData
  | RewardGemCaseWonData
  | RewardHolidayCaseWonData
  | RewardLevelCaseWonData
  | RewardTokenPackData
  | TipReceiveData
  | TipSendData
  | WithdrawCryptoData
  | WithdrawSkinData
  | VaultDepositData
  | VaultWithdrawData;

interface AdminTokenCreditData {
  kind: "admin-token-credit";
  adjustment: AdminCreditAdjustment;
}

interface AdminTokenDebitData {
  kind: "admin-token-debit";
  adjustment: AdminDebitAdjustment;
}
interface AffiliateCampaignCommissionClaimData {
  campaignId: string;
  kind: "affiliate-campaign-commission-claim";
  location: UserLocation;
}

interface AffiliateCommissionClaimData {
  kind: "affiliate-commission-claim";
  location: UserLocation;
}

interface AffiliateReloadClaimData {
  kind: "affiliate-reload-claim";
  location: UserLocation;
}

interface CaseBattleJoinData {
  kind: "case-battle-join";
  bet: TransactionBetData;
  gameId: string;
}

interface CaseBattleWonData {
  kind: "case-battle-won";
  gameId: string;
}

interface CaseItemWonData {
  kind: "case-item-won";
  gameId: string;
  chest: BasicChest;
  item: ChestItem;
}

interface CaseSpinData {
  kind: "case-spin";
  bet: TransactionBetData;
  gameId: string;
  chest: BasicChest;
}

interface DepositCryptoData {
  kind: "deposit-crypto";
  externalId: string;
  sourceAddress: string;
  destinationAddress: string;
  txHash: string;
  assetId: string;
  cryptoKind: CryptoKind;
  cryptoAmount: number;
  usdAmount: number;
  feeAmount: number;
  feeUsdAmount: number;
  confirmations: number;
  requiredConfirmations: number;
  processed?: boolean;
}

interface DepositGiftCardData {
  kind: "deposit-gift-card";
  tag: GiftCardTag;
  batchId: string;
  cardId: string;
}

interface DepositSkinData {
  kind: "deposit-skin";
  assetId: string;
  provider: MarketProvider;
  item: MarketInventoryItem;
  externalId: string;
  steamId: string;
  usdAmount: number;
  tradeOfferId?: string;
}

interface DepositSwappedData {
  kind: "deposit-swapped";
  ticketId: string;
  externalId: string;
  walletAddress: string;
  txHash: string;
  cryptoKind: "BTC" | "LTC";
  cryptoAmount: number;
  cryptoRate: number;
  cryptoUsdValue: number;
  usdAmount: number;
  feeUsdAmount: number;
}
/* Review needed fields */
interface DuelBetData {
  kind: "duel-bet";
  bet: TransactionBetData;
  gameId: string;
}
interface DuelWonData {
  kind: "duel-won";
  gameId: string;
  multiplier: number;
}

interface CrashBetData {
  kind: "crash-bet";
  bet: TransactionBetData;
  roundId: string;
  gameId: string;
}

interface CrashWonData {
  kind: "crash-won";
  roundId: string;
  gameId: string;
  multiplier: number;
  roundMultiplier: number;
}

interface DiceBetData {
  kind: "dice-bet";
  bet: TransactionBetData;
  gameId: string;
}

interface DiceWonData {
  kind: "dice-won";
  gameId: string;
  multiplier: number;
  targetValue: number;
  targetKind: DiceTargetKind;
}

interface DoubleBetData {
  kind: "double-bet";
  bet: TransactionBetData;
  roundId: string;
  gameId: string;
  betKind: DoubleBetKind;
}
interface DoubleJackpotWonData {
  kind: "double-jackpot-won";
  roundId: string;
  gameId: string;
}

interface DoubleWonData {
  kind: "double-won";
  roundId: string;
  gameId: string;
  multiplier: number;
}
interface LimboBetData {
  kind: "limbo-bet";
  bet: TransactionBetData;
  gameId: string;
}

interface LimboWonData {
  kind: "limbo-won";
  gameId: string;
  targetValue: number;
  multiplier: number;
}

interface MinesBetData {
  kind: "mines-bet";
  bet: TransactionBetData;
  gameId: string;
  gridSize: number;
  mineCount: number;
}

interface MinesWonData {
  kind: "mines-won";
  gameId: string;
  gridSize: number;
  mineCount: number;
  revealCount: number;
  multiplier: number;
}
interface BlackjackBetData {
  kind: "blackjack-bet" | "blackjack-split" | "blackjack-double";
  bet: TransactionBetData;
  gameId: string;
}
interface BlackjackSidebetBetData {
  kind: "blackjack-sidebet-bet";
  subKind: BlackjackBetTypeInsurance;
  bet: TransactionBetData;
  gameId: string;
}

interface BlackjackWonData {
  kind: "blackjack-won";
  gameId: string;
  // targetValue: number;
  // multiplier: number;
  // mainSubPayout: number;
  // splitPayout: number;
  // doublePayout: number;
}
// todo switch to transaction param type and not use this type
export interface BlackjackSidebetWonData {
  kind: "blackjack-sidebet-won";
  subKind: SidebetPayout["type"];
  gameId: string;
  title: string;
  multiplier: SidebetPayout["multiplier"];
}
interface HubEightCreditData {
  kind: "hub-eight-credit";
  transactionUUID: string;
  supplierTransactionId: string;
  supplierUser?: string | null;
  roundClosed?: boolean | null;
  round?: string | null;
  rewardUUID?: string | null;
  requestUUID: string;
  referenceTransactionUUID: string;
  isFree?: boolean | null;
  isSupplierPromo?: string | null;
  isAggregated?: boolean | null;
  gameCode: string;
  currency: string;
  betData?: string | null; // Hub88 -> bet field
  amount: number;
  meta?: object | null;
}

interface HubEightDebitData {
  kind: "hub-eight-debit";
  transactionUUID: string;
  supplierTransactionId: string;
  roundClosed: boolean | null;
  round: string | null;
  requestUUID: string;
  gameCode: string;
  amount: number;
  meta: object | null;
}

interface HubEightRollbackData {
  kind: "hub-eight-rollback";
  username: string;
  transactionUUID: string;
  supplierTransactionId: string;
  roundClosed: boolean;
  round: string;
  requestUUID: string;
  referenceTransactionUUID: string; // Transaction ID used for rolling back data
  gameCode: string;
  meta: object | null;
}

interface PromotionCardRedeemData {
  kind: "promotion-card-redeem";
  tag: GiftCardTag;
  batchId: string;
  cardId: string;
}

interface PromotionCodeRedeemData {
  kind: "promotion-code-redeem";
  promotionId: string;
  location: UserLocation;
}

interface RainPayoutData {
  kind: "rain-payout";
  rainId: string;
  splits: ChatRainSplits;
}

interface RainTipData {
  kind: "rain-tip";
  rainId: string;
}

interface RewardAdventItemData {
  kind: "reward-advent-item";
  targetValue: number;
  multiplier: number;
  item: LootItem;
}

interface RewardBoostData {
  kind: "reward-boost";
  timeframe: RewardBoostTimeframe;
  eventId?: string;
  backRate: number;
  minAmount: number;
  maxAmount: number;
  evBack: number;
  ngrBack: number;
  backAmount: number;
}

interface RewardClaimData {
  kind: "reward-claim";
  claimId: string;
  claimKind: RewardClaimKind;
}

interface RewardGemCaseWonData {
  kind: "reward-gem-case-item";
  gameId: string;
  chest: BasicChest;
  item: ChestItem;
}

interface RewardDailyCaseWonData {
  kind: "reward-daily-case-item";
  gameId: string;
  chest: BasicChest;
  item: ChestItem;
}

interface RewardLevelCaseWonData {
  kind: "reward-level-case-item";
  gameId: string;
  chest: BasicChest;
  item: ChestItem;
}

interface RewardHolidayCaseWonData {
  kind: "reward-holiday-case-item";
  gameId: string;
  chest: BasicChest;
  item: ChestItem;
}

interface RewardFaucetData {
  kind: "reward-faucet";
}

interface RewardTokenPackData {
  kind: "reward-token-pack";
  productId: string;
  gemAmount: number;
}

interface TipReceiveData {
  kind: "tip-receive";
  sender: BasicUser;
}

interface TipSendData {
  kind: "tip-send";
  receiver: BasicUser;
  location: UserLocation;
}

interface WithdrawCryptoData {
  kind: "withdraw-crypto";
  destinationAddress: string;
  assetId: string;
  cryptoKind: CryptoKind;
  usdRate: number;
  cryptoAmount: number;
  usdAmount: number;
  feeAmount: number;
  feeUsdAmount: number;
  approvedBy?: "auto" | BasicUser;
  approvedDate?: Date;
  txHash?: string;
}

interface WithdrawSkinData {
  kind: "withdraw-skin";
  itemId: string;
  provider: MarketProvider;
  steamId: string;
  tradeUrl: string;
  item: MarketItem;
  externalId?: string;
  tradeOfferId?: string;
}

interface VaultDepositData {
  kind: "vault-deposit";
}

interface VaultWithdrawData {
  kind: "vault-withdraw";
}
