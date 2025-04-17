import { Strings } from "@core/services/strings";
import { Card } from "@client/comps/cards/Card";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LinkSlide } from "./LinkSlide";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const LinkCard = () => {
  const steamId = useAppSelector((x) => x.user.steamId);
  const discordId = useAppSelector((x) => x.user.discordId);
  const googleId = useAppSelector((x) => x.user.googleId);
  const twitchId = useAppSelector((x) => x.user.twitchId);
  const {t} = useTranslation(["account"]);
  return (
    <Card column>
      <LinkSlide
        provider="steam"
        description={t("linkedAccounts.steam.description")}
        linked={Strings.isTruthy(steamId)}
      />
      <LinkSlide
        provider="discord"
        description={t("linkedAccounts.discord.description")}
        linked={Strings.isTruthy(discordId)}
      />
      <LinkSlide
        provider="twitch"
        description={t("linkedAccounts.twitch.description")}
        linked={Strings.isTruthy(twitchId)}
      />
      <LinkSlide
        provider="google"
        description={t("linkedAccounts.google.description")}
        linked={Strings.isTruthy(googleId)}
      />
    </Card>
  );
};
