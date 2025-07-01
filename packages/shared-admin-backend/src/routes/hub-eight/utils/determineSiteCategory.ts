export function determineSiteCategory(category: string): string {
  const cat = category.toLowerCase();

  if (cat.includes("slot")) {
    return "slot";
  }
  if (cat.includes("live") && cat !== "live game shows") {
    return "live";
  }
  if (cat.includes("game show")) {
    return "game_show";
  }
  // Default: keep original category (or convert to lowercase if you want consistency)
  return category;
}
