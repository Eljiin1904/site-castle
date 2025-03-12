import { UserPermissions } from "#core/types/users/UserPermissions";
import { UserRole } from "#core/types/users/UserRole";

export function getPermissions(kind: UserRole): UserPermissions {
  switch (kind) {
    case "user":
      return {
        deposit: true,
        withdraw: true,
        usePromotions: true,
      };
    case "influencer":
      return {
        deposit: true,
        withdraw: true,
        usePromotions: true,
      };
    case "helper":
      return {
        deposit: true,
        withdraw: true,
        usePromotions: true,
      };
    case "moderator":
      return {
        deposit: true,
        withdraw: true,
        usePromotions: true,
        manageChat: true,
      };
    case "support":
      return {
        manageChat: true,
      };
    case "developer":
    case "admin":
    case "owner":
      return {
        deposit: true,
        withdraw: true,
        usePromotions: true,
        manageChat: true,
        viewHiddenUsers: true,
        maintenanceAccess: true,
        adminAccess: true,
      };
    default:
      return {};
  }
}
