import { RewardBoostTimeframe } from "#core/types/rewards/RewardBoostTimeframe";
import { getLevelInfo } from "./getLevelInfo";

export function getBoostInfo({
  timeframe,
  level,
  backRateMultiplier,
}: {
  timeframe: RewardBoostTimeframe;
  level: number;
  backRateMultiplier?: number;
}) {
  const levelInfo = getLevelInfo(level);

  if (!backRateMultiplier) {
    backRateMultiplier = 1;
  }

  switch (timeframe) {
    case "daily":
      return {
        backRate: 0.0005 * backRateMultiplier,
        minAmount: 0,
        maxAmount: 0,
      };
    case "weekly":
      return {
        backRate: 0.005 * backRateMultiplier,
        minAmount: levelInfo.weeklyMin,
        maxAmount: levelInfo.weeklyMax,
      };
    case "monthly":
      return {
        backRate: 0.01 * backRateMultiplier,
        minAmount: levelInfo.monthlyMin,
        maxAmount: levelInfo.monthlyMax,
      };
  }
}
