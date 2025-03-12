import { Intimal } from "#core/services/intimal";

export const tiers = [
  { rate: 0, xp: 0 },
  { rate: 0.1, xp: 0 },
  { rate: 0.125, xp: Intimal.fromDecimal(10000000) },
  { rate: 0.15, xp: Intimal.fromDecimal(15000000) },
  { rate: 0.175, xp: Intimal.fromDecimal(25000000) },
  { rate: 0.2, xp: Intimal.fromDecimal(50000000) },
  { rate: 0.225, xp: Intimal.fromDecimal(75000000) },
  { rate: 0.25, xp: Intimal.fromDecimal(100000000) },
  { rate: 0.275, xp: Intimal.fromDecimal(150000000) },
  { rate: 0.3, xp: Intimal.fromDecimal(250000000) },
  { rate: 0.325, xp: Intimal.fromDecimal(500000000) },
  { rate: 0.35, xp: Intimal.fromDecimal(750000000) },
  { rate: 0.375, xp: Intimal.fromDecimal(1000000000) },
  { rate: 0.4, xp: Intimal.fromDecimal(1500000000) },
];
