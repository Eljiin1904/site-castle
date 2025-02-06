import { Intimal } from "@core/services/intimal";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { waitForConfirmation } from "@client/modals/confirm/ConfirmModal";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { SvgSiteToken } from "@client/svgs/site/SvgSiteToken";
import { Economy } from "#app/services/economy";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { waitForAuthenticatorCode } from "../../security/AuthenticatorCodeModal";

export function useSendTip() {
  const tfaEnabled = useAppSelector((x) => x.user.tfa.enabled);
  const settings = useAppSelector((x) => x.user.settings);
  const require2fa = tfaEnabled && settings.withdraw2fa;

  const handleTip = async ({
    lookup,
    tipAmount,
  }: {
    lookup: string;
    tipAmount: number;
  }) => {
    const confirmed = await waitForConfirmation({
      heading: "Confirm Tip",
      message: (
        <Div
          display="block"
          textAlign="center"
        >
          <Span>{"Are you sure you want to send "}</Span>
          <Span
            weight="semi-bold"
            color="white"
          >
            {lookup}
          </Span>
          <Div
            display="inline-flex"
            top={3}
          >
            <Vector
              as={SvgSiteToken}
              size={14}
              ml={4}
              mr={2}
            />
            <Span
              weight="semi-bold"
              color="gold"
            >
              {Intimal.toLocaleString(tipAmount)}
            </Span>
          </Div>
          <Span>{" tokens?"}</Span>
        </Div>
      ),
    });

    if (!confirmed) return;

    let tfac: string | undefined;

    if (require2fa) {
      tfac = await waitForAuthenticatorCode();
      if (!tfac) return;
    }

    await Economy.sendTip({ lookup, tipAmount, tfac });

    Toasts.success(
      `You tipped ${lookup} ${Intimal.toLocaleString(tipAmount)} tokens.`,
    );
    Dialogs.close("primary");
  };

  return handleTip;
}
