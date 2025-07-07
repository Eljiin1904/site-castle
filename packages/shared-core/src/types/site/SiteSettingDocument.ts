export type SiteSettingDocument = {
  _id: SiteSettingId;
  value: SiteSettingValue;
  lastUpdateDate: Date;
};

export type SiteSettingId = keyof SiteSettingObject;

export type SiteSettingValue = SiteSettingObject[SiteSettingId];

export type SiteSettingObject = GeneralSettings &
  CryptoSettings &
  SkinSettings &
  XpSettings &
  RainSettings &
  FeatureToggles &
  ThresholdSettings &
  MarketProviderToggles &
  ChestSettings;

interface GeneralSettings {
  version: string;
  maintenance: boolean;
  announcement: string;
}

interface CryptoSettings {
  manualCryptoWithdraw: boolean;
  cryptoWithdrawSingleMax: number;
  cryptoWithdrawDailyMax: number;
}

interface SkinSettings {
  manualSkinWithdraw: boolean;
  skinWithdrawSingleMax: number;
  skinWithdrawDailyMax: number;
}

interface XpSettings {
  gemRate: number;
  casesXpRate: number;
  caseBattlesXpRate: number;
  doubleXpRate: number;
  crashXpRate: number;
  diceXpRate: number;
  limboXpRate: number;
  minesXpRate: number;
  blackjackXpRate: number;

  blackjackInsuranceXpRate: number;
  blackjackLuckyLadiesXpRate: number;
  blackjackBlackjack15xXpRate: number;
  blackjackPerfectPairsXpRate: number;
  blackjack213XpRate: number;
}

interface RainSettings {
  rainTaxRate: number;
  rainBaseAmount: number;
  rainMinInterval: number;
  rainMaxInterval: number;
  rainDuration: number;
  rainWagerRequirement: number;
}

interface FeatureToggles {
  cryptoWithdrawsEnabled: boolean;
  skinDepositsEnabled: boolean;
  skinWithdrawsEnabled: boolean;
  tippingEnabled: boolean;
  affiliatesEnabled: boolean;
  rewardsEnabled: boolean;
  rainEnabled: boolean;
  chatEnabled: boolean;
  casesEnabled: boolean;
  caseBattlesEnabled: boolean;
  diceEnabled: boolean;
  doubleEnabled: boolean;
  crashEnabled: boolean;
  limboEnabled: boolean;
  minesEnabled: boolean;
  blackjackEnabled: boolean;
  blackjackLuckyLadiesEnabled: boolean;
  blackjackBlackjack15xEnabled: boolean;
  blackjackPerfectPairsEnabled: boolean;
  blackjack213Enabled: boolean;
  hubEightEnabled: boolean;

  slotEnabled: boolean;
  liveGameEnabled: boolean;
  gameShowEnabled: boolean;
  casinoEnabled: boolean;
}

interface ThresholdSettings {
  activityThreshold: number;
  betHighrollerThreshold: number;
  betLuckyThreshold: number;
  chatGeneralRequirement: number;
  chatHighrollerRequirement: number;
  jackpotThreshold: number;
}

interface MarketProviderToggles {
  skinifyEnabled: boolean;
  skinsbackEnabled: boolean;
  skindeckEnabled: boolean;
}

interface ChestSettings {
  minAnnounceAmount: number;
  minAnnounceMultiplier: number;
}
