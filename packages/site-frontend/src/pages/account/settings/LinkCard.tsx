import { Strings } from "@core/services/strings";
import { SvgDiscord } from "@client/svgs/brands/SvgDiscord";
import { SvgGoogle } from "@client/svgs/brands/SvgGoogle";
import { SvgSteam } from "@client/svgs/brands/SvgSteam";
import { SvgTwitch } from "@client/svgs/brands/SvgTwitch";
import { Heading } from "@client/comps/heading/Heading";
import { CardSection } from "@client/comps/cards/CardSection";
import { Card } from "@client/comps/cards/Card";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { LinkSlide } from "./LinkSlide";

export const LinkCard = () => {
  const steamId = useAppSelector((x) => x.user.steamId);
  const discordId = useAppSelector((x) => x.user.discordId);
  const googleId = useAppSelector((x) => x.user.googleId);
  const twitchId = useAppSelector((x) => x.user.twitchId);

  return (
    <Card column>
      <CardSection
        position="header"
        py={16}
      >
        <Heading>{"Linked Accounts"}</Heading>
      </CardSection>
      <LinkSlide
        icon={SvgSteam}
        provider="steam"
        linked={Strings.isTruthy(steamId)}
      />
      <LinkSlide
        icon={SvgDiscord}
        provider="discord"
        linked={Strings.isTruthy(discordId)}
      />
      <LinkSlide
        icon={SvgTwitch}
        provider="twitch"
        linked={Strings.isTruthy(twitchId)}
      />
      <LinkSlide
        icon={SvgGoogle}
        provider="google"
        linked={Strings.isTruthy(googleId)}
      />
    </Card>
  );
};
