import { Strings } from "@core/services/strings";
import { Card } from "@client/comps/cards/Card";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LinkSlide } from "./LinkSlide";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { CardSection } from "@client/comps/cards/CardSection";
import { Heading } from "@client/comps/heading/Heading";

export const LinkCard = () => {
  const steamId = useAppSelector((x) => x.user.steamId);
  const discordId = useAppSelector((x) => x.user.discordId);
  const googleId = useAppSelector((x) => x.user.googleId);
  const twitchId = useAppSelector((x) => x.user.twitchId);
  const {t} = useTranslation(["account"]);
  return (
    <Card column>
      <CardSection position="header">
        <Heading as="h3" size={24} textTransform="uppercase" fontWeight="regular">{t('linkedAccounts.title')}</Heading>
      </CardSection>
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
        borderBottom={false}
      />
    </Card>
  );
};
