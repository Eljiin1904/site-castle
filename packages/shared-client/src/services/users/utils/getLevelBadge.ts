export function getLevelBadge(level: number) {
  if (level < 10) return "/badges/bronze-1";
  if (level < 20) return "/badges/bronze-2";
  if (level < 30) return "/badges/bronze-3";

  if (level < 40) return "/badges/copper-1";
  if (level < 50) return "/badges/copper-2";
  if (level < 60) return "/badges/copper-3";

  if (level < 70) return "/badges/silver-1";
  if (level < 80) return "/badges/silver-2";
  if (level < 90) return "/badges/silver-3";

  if (level < 100) return "/badges/cyan-1";
  if (level < 110) return "/badges/cyan-2";
  if (level < 120) return "/badges/cyan-3";

  if (level < 130) return "/badges/blue-1";
  if (level < 140) return "/badges/blue-2";
  if (level < 150) return "/badges/blue-3";

  if (level < 160) return "/badges/purple-1";
  if (level < 170) return "/badges/purple-2";
  if (level < 180) return "/badges/purple-3";
  if (level < 190) return "/badges/purple-4";

  if (level < 200) return "/badges/pink-1";
  if (level < 210) return "/badges/pink-2";
  if (level < 220) return "/badges/pink-3";
  if (level < 230) return "/badges/pink-4";

  if (level < 240) return "/badges/red-1";
  if (level < 250) return "/badges/red-2";
  if (level < 260) return "/badges/red-3";
  if (level < 270) return "/badges/red-4";

  if (level < 280) return "/badges/gold-1";
  if (level < 290) return "/badges/gold-2";
  if (level < 300) return "/badges/gold-3";
  return "/badges/gold-4";
}
