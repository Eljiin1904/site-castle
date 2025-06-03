export function getLootVolatility(
  chestCost: number,
  item: { baseName: string; lootValue: number; dropRate: number },
) {
  const int = 1_000_000; // clash uses 100_000
  const rate = item.dropRate / int;
  if (rate >= 1) throw new Error("Rate is greater than 1 id:" + item.baseName);
  if (rate < 0) throw new Error("Rate is less than 0 id:" + item.baseName);
  const percDelta = (item.lootValue - chestCost) / chestCost;
  const netReturn = item.lootValue - chestCost;
  return {
    rate,
    percDelta,
    lootValue: item.lootValue,
    divLootValue: item.lootValue / chestCost,
    volCoeff: rate * percDelta,
    netReturn,
  };
}
