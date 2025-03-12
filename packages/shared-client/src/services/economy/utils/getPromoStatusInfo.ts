import { isFuture } from "date-fns";
import { PromotionCodeDocument } from "@core/types/economy/PromotionCodeDocument";

export function getPromoStatusInfo(promo: PromotionCodeDocument): {
  color: Color;
  label: string;
} {
  return {
    color: promo.cancelled
      ? "light-red"
      : isFuture(promo.startDate)
        ? "yellow"
        : isFuture(promo.endDate)
          ? "green"
          : "white",
    label: promo.cancelled
      ? "Cancelled"
      : isFuture(promo.startDate)
        ? "Pending"
        : isFuture(promo.endDate)
          ? "Active"
          : "Ended",
  };
}
