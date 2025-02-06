import { Span } from "@client/comps/span/Span";
import { Heading } from "@client/comps/heading/Heading";
import { Card } from "@client/comps/cards/Card";
import { CardSection } from "@client/comps/cards/CardSection";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { ToggleSlide } from "./ToggleSlide";

export const ToggleCard = () => {
  const tfaEnabled = useAppSelector((x) => x.user.tfa.enabled);

  return (
    <Card column>
      <CardSection
        position="header"
        py={16}
      >
        <Heading>{"Preferences"}</Heading>
      </CardSection>
      <ToggleSlide
        id="login2fa"
        heading="Login 2FA*"
        description="Require 2FA on login."
        disabled={!tfaEnabled}
      />
      <ToggleSlide
        id="bet2fa"
        heading="Bet 2FA*"
        description="Require 2FA on the first bet of a session."
        disabled={!tfaEnabled}
      />
      <ToggleSlide
        id="withdraw2fa"
        heading="Withdraw 2FA*"
        description="Require 2FA on withdraw and tipping."
        disabled={!tfaEnabled}
      />
      <ToggleSlide
        id="largeBetConfirm"
        heading="Confirm Large Bets"
        description="Confirm bets over 70% of your current balance."
      />
      <ToggleSlide
        id="unusualBetConfirm"
        heading="Confirm Unusual Bets"
        description="Confirm bets over 10x the amount of your previous bet."
      />
      <ToggleSlide
        id="receiveTips"
        heading="Receive Tips"
        description="Allow receiving tips from other players."
      />
      <ToggleSlide
        id="hiddenMode"
        heading="Hidden Mode"
        description="Hide my user info in public feeds."
      />
      <CardSection>
        <Span
          weight="semi-bold"
          color="white"
        >
          {"*"}
        </Span>
        <Span ml={4}>{"Authenticator must be enabled"}</Span>
      </CardSection>
    </Card>
  );
};
