import { UserReferer } from "#core/types/users/UserReferer";

export function getRefererString(referer: UserReferer) {
  switch (referer.kind) {
    case "campaign":
      return referer.id;
    case "promotion":
      return referer.id;
    case "user":
      return referer.user.name;
    case "sponsored":
      return referer.user.name;
    default:
      return "N/A";
  }
}
