import { Fragment } from "react";
import { Link } from "@client/comps/link/Link";
import { SvgDiscord } from "@client/svgs/brands/SvgDiscord";
import { SvgTwitter } from "@client/svgs/brands/SvgTwitter";
import { SvgTelegram } from "@client/svgs/brands/SvgTelegram";
import { Button } from "@client/comps/button/Button";
import config from "#app/config";

export const FooterSocials = () => {
  return (
    <Fragment>
      <SocialButton
        href={config.twitterURL}
        icon={SvgTwitter}
      />
      <SocialButton
        href={config.discordURL}
        icon={SvgDiscord}
      />
      <SocialButton
        href={config.telegramURL}
        icon={SvgTelegram}
      />
    </Fragment>
  );
};

const SocialButton = ({ icon, href }: { icon: Svg; href: string }) => {
  return (
    <Link
      type="a"
      href={href}
      hover="none"
    >
      <Button
        kind="secondary"
        icon={icon}
        size="sm"
      />
    </Link>
  );
};
