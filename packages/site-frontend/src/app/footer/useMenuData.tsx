import { useMemo } from "react";
import { LinkProps } from "@client/comps/link/Link";
import { Dialogs } from "@client/services/dialogs";
import { SiteStatsModal } from "#app/modals/site-stats/SiteStatsModal";
import { useChatToggle } from "#app/hooks/chat/useChatToggle";
import { useIntercomManager } from "#app/hooks/support/useIntercomManager";
import config from "#app/config";

export type MenuItem = LinkProps & { label: string };

export type MenuData = {
  [key in "games" | "support" | "community" | "about"]: {
    heading: string;
    items: MenuItem[];
  };
};

export function useMenuData() {
  const intercom = useIntercomManager();
  const toggleChat = useChatToggle();

  const data: MenuData = useMemo(
    () => ({
      games: {
        heading: "Games",
        items: [
          { type: "router", label: "Battles", to: "/case-battles" },
          { type: "router", label: "Cases", to: "/cases" },
          { type: "router", label: "Double", to: "/double" },
          { type: "router", label: "Dice", to: "/dice" },
          { type: "router", label: "Limbo", to: "/limbo" },
        ],
      },
      support: {
        heading: "Support",
        items: [
          { type: "router", label: "Fairness", to: "/fairness" },
          {
            type: "action",
            label: "Live Support",
            onClick: () => intercom.handleToggle(),
          },
        ],
      },
      community: {
        heading: "Community",
        items: [
          { type: "a", label: "𝕏 / Twitter", href: config.twitterURL },
          { type: "a", label: "Discord", href: config.discordURL },
          { type: "a", label: "Telegram", href: config.telegramURL },
          {
            type: "action",
            label: "Chat",
            onClick: () => toggleChat(),
          },
          {
            type: "action",
            label: "Stats",
            onClick: () => Dialogs.open("primary", <SiteStatsModal />),
          },
        ],
      },
      about: {
        heading: "About Us",
        items: [
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
          { type: "router", label: "KYC Policy", to: "/about/kyc-policy" },
          { type: "router", label: "AML Policy", to: "/about/aml-policy" },
          {
            type: "router",
            label: "Responsible Gaming",
            to: "/about/responsible-gaming",
          },
        ],
      },
    }),
    [],
  );

  return data;
}
