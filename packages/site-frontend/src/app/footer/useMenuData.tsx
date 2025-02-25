import { useMemo } from "react";
import { LinkProps } from "@client/comps/link/Link";
import { useIntercomManager } from "#app/hooks/support/useIntercomManager";
import config from "#app/config";
import { SvgTwitter } from "@client/svgs/brands/SvgTwitter";
import { SvgInstagram } from "@client/svgs/brands/SvgInstagram";
import { SvgFacebook } from "@client/svgs/brands/SvgFacebook";

export type MenuItem = LinkProps & { label: string; href?: string; icon?: Svg };

export type MenuData = {
  [key in "games" | "support" | "community"]: {
    heading: string;
    items: MenuItem[];
  };
};

export function useMenuData() {
  const intercom = useIntercomManager();

  const data: MenuData = useMemo(
    () => ({
      games: {
        heading: "Platform",
        items: [
          { type: "router", label: "Home", to: "/" },
          { type: "router", label: "Crash Game", to: "/crash" },
          { type: "router", label: "Duel Game", to: "/duel" },
          { type: "router", label: "Dice", to: "/dice" },
          { type: "router", label: "Referrals", to: "/referrals" },
          { type: "router", label: "Wallet", to: "/wallet" },
          { type: "router", label: "Token", to: "/token" },
          { type: "router", label: "Blog", to: "/blog" },
          { type: "router", label: "Fairness", to: "/fairness" },
        ],
      },
      support: {
        heading: "About Us",
        items: [
          {
            type: "action",
            label: "Support",
            onClick: () => intercom.handleToggle(),
          },
          {
            type: "action",
            label: "FAQ's",
            onClick: () => intercom.handleToggle(),
          },
          {
            type: "router",
            label: "Terms of Service",
            to: "/about/terms-of-service",
          },
          {
            type: "router",
            label: "Privacy Policy",
            to: "/about/privacy-policy",
          },
          {
            type: "router",
            label: "Gaming Hotline",
            to: "/about/responsible-gaming",
          },
          {
            type: "router",
            label: "Self Exclusion",
            to: "/about/responsible-gaming",
          },
          {
            type: "router",
            label: "Trustpilot",
            to: "/about/responsible-gaming",
          },
        ],
      },
      community: {
        heading: "Socials",
        items: [
          { type: "a", label: " Facebook", href: config.discordURL, icon: SvgFacebook },
          { type: "a", label: "Twitter", href: config.twitterURL, icon: SvgTwitter },
          { type: "a", label: "Instagram", href: config.telegramURL, icon: SvgInstagram },
        ],
      },
    }),
    [],
  );

  return data;
}
