import { UserRole } from "@core/types/users/UserRole";
import { SvgCode } from "#client/svgs/common/SvgCode";
import { SvgCrown } from "#client/svgs/common/SvgCrown";
import { SvgShield } from "#client/svgs/common/SvgShield";
import { SvgLifeRing } from "#client/svgs/common/SvgLifeRing";
import { SvgCog } from "#client/svgs/common/SvgCog";
import { SvgPlusCircle } from "#client/svgs/common/SvgPlusCircle";
import { SvgCheckCircle } from "#client/svgs/common/SvgCheckCircle";

interface RoleInfo {
  icon: Svg;
  color: Color;
  tooltip: string;
}

export function getRoleInfo(role: UserRole): RoleInfo | undefined {
  switch (role) {
    case "influencer":
      return {
        icon: SvgCheckCircle,
        color: "light-cyan",
        tooltip: "Influencer",
      };
    case "helper":
      return {
        icon: SvgPlusCircle,
        color: "light-blue",
        tooltip: "Helper",
      };
    case "moderator":
      return {
        icon: SvgShield,
        color: "light-orange",
        tooltip: "Moderator",
      };
    case "support":
      return {
        icon: SvgLifeRing,
        color: "purple",
        tooltip: "Support",
      };
    case "developer":
      return {
        icon: SvgCode,
        color: "cyan",
        tooltip: "Developer",
      };
    case "admin":
      return {
        icon: SvgCog,
        color: "orange",
        tooltip: "Admin",
      };
    case "owner":
      return {
        icon: SvgCrown,
        color: "gold",
        tooltip: "Owner",
      };
    default:
      return undefined;
  }
}
