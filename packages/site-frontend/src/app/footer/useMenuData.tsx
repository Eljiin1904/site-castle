import { useMemo } from "react";
import { LinkProps } from "@client/comps/link/Link";
import { useIntercomManager } from "#app/hooks/support/useIntercomManager";
import config from "#app/config";
import { SvgTwitter } from "@client/svgs/brands/SvgTwitter";
import { SvgInstagram } from "@client/svgs/brands/SvgInstagram";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { SvgDiscord } from "@client/svgs/brands/SvgDiscord";
import { SvgTelegram } from "@client/svgs/brands/SvgTelegram";
import { SvgKick } from "@client/svgs/brands/SvgKick";

export type MenuItem = LinkProps & { label: string; href?: string; icon?: Svg };

export type MenuData = {
  [key in "games" | "support" | "community"]: {
    heading: string;
    items: MenuItem[];
  };
};

export function useMenuData() {
  const intercom = useIntercomManager();
  const { t, i18n } = useTranslation(["games"]);

  const data: MenuData = useMemo(
    () => ({
      games: {
        heading: t("footer.platform"),
        items: [
          { type: "router", label: t("menu.home"), to: "/" },
          { type: "router", label: t("games:crash"), to: "/crash" },
          { type: "router", label: t("games:duel"), to: "/duel" },
          { type: "router", label: t("games:dice"), to: "/dice" },
          { type: "router", label: t("menu.referrals"), to: "/referrals" },
          { type: "router", label: t("menu.wallet"), to: "/wallet" },
          { type: "router", label: t("menu.token"), to: "/token" },
          { type: "router", label: t("menu.blog"), to: "/blog" },
          { type: "router", label: t("menu.fairness"), to: "/fairness" },
        ],
      },
      support: {
        heading: t("footer.about"),
        items: [
          {
            type: "action",
            label: t("footer.support"),
            onClick: () => intercom.handleToggle(),
          },
          {
            type: "action",
            label: t("footer.faq"),
            onClick: () => intercom.handleToggle(),
          },
          {
            type: "router",
            label: t("footer.terms"),
            to: "/about/terms-of-service",
          },
          {
            type: "router",
            label: t("footer.privacy"),
            to: "/about/privacy-policy",
          },
          {
            type: "router",
            label: t("footer.hotline"),
            to: "/about/responsible-gaming",
          },
          {
            type: "router",
            label:t("footer.selfExclusion"),
            to: "/about/responsible-gaming",
          },
          {
            type: "router",
            label: t("footer.trustpilot"),
            to: "/about/responsible-gaming",
          },
        ],
      },
      community: {
        heading: t("footer.socials"),
        items: [  
          { type: "a", label: "X", href: config.twitterURL, icon: SvgTwitter },
          { type: "a", label: "Instagram", href: config.instagramURL, icon: SvgInstagram },
          { type: "a", label: "Telegram", href: config.telegramURL, icon: SvgTelegram },
          { type: "a", label: " Discord", href: config.discordURL, icon: SvgDiscord },
          { type: "a", label: "Kick", href: config.twitterURL, icon: SvgKick }          
        ],
      },
    }),
    [i18n.language],
  );

  return data;
}
