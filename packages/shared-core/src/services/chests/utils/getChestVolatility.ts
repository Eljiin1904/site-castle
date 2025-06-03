import { ChestDocument } from "#core/types/chests/ChestDocument";
import { compressRange } from "./compressRange";
import { getLootVolatility } from "./getLootVolatility";
// import { compressRange } from "./compressRange";
// import { getLootVolatility } from "./getLootVolatility";

type Chest = {
  items: { baseName: string; lootValue: number; dropRate: number }[];
  openCost: number;
};

export function getChestVolatility(chest: Chest) {
  const volAr = chest.items.map((item) => {
    return getLootVolatility(chest.openCost, item);
  });

  const ev = volAr.reduce((acc, v) => acc + v.percDelta * v.rate, 0);
  const evSquared = volAr.reduce((acc, v) => acc + Math.pow(v.percDelta, 2) * v.rate, 0);

  const variance = evSquared - Math.pow(ev, 2);
  const stdDev = Math.sqrt(variance);

  // hacking the consistent distribution
  let val = compressRange(stdDev, 13, 0.05, "geo");
  val = compressRange(val, 3, 0.2, "geo");
  val = val / 5.5; // scale to 0-1

  if (val > 1) val = 1;
  if (val < 0) val = 0;

  return val;
}
