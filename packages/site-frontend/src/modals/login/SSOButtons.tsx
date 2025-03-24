import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Dialogs } from "@client/services/dialogs";
import { SvgGoogle } from "@client/svgs/brands/SvgGoogle";
import { SvgMetamask } from "@client/svgs/brands/SvgMetamask";
import { SvgSteam } from "@client/svgs/brands/SvgSteam";
import { SocialAuthStartModal } from "../security/SocialAuthStartModal";
import { useMetaMaskAuth } from "#app/hooks/security/useMetaMaskAuth";
import { Web3AuthStartModal } from "../security/Web3AuthStartModal";
import "./SSOButtons.scss";

export const SSOButtons = () => {
  const { connectMetaMask } = useMetaMaskAuth();
  return (
    <Div
      className="sso-buttons"
      justifyContent="space-between"
    >
      <Button
        width={100}
        height={40}
        kind="tertiary"
        size="sso"
        icon={SvgSteam}
        iconSize={100}
        fx
        onClick={() => Dialogs.open("primary", <SocialAuthStartModal provider="steam" />)}
      />
      <Button
        width={100}
        height={40}
        kind="tertiary"
        size="sso"
        icon={SvgGoogle}
        iconSize={100}
        fx
        onClick={() => Dialogs.open("primary", <SocialAuthStartModal provider="google" />)}
      />
      <Button
        width={128}
        height={40}
        kind="tertiary"
        size="sso"
        icon={SvgMetamask}
        iconSize={128}
        fx
        onClick={connectMetaMask}
      />
    </Div>
  );
};
