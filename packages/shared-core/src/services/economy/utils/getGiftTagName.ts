import { GiftCardTag } from "#core/types/economy/GiftCardTag";

export function getGiftTagName(tag: GiftCardTag): string {
  switch (tag) {
    case "g2a":
      return "G2A";
    case "kinguin":
      return "Kinguin";
    case "pulse":
      return "Pulse";
    case "giveaway":
      return "Giveaway";
  }
}
