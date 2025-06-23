import { Intimal } from "@core/services/intimal";
import { Div } from "@client/comps/div/Div";
import { Span } from "@client/comps/span/Span";
import { waitForConfirmation } from "@client/modals/confirm/ConfirmModal";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { Economy } from "#app/services/economy";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { waitForAuthenticatorCode } from "../../security/AuthenticatorCodeModal";
import { useTranslation } from "@core/services/internationalization/internationalization";

export function useSendTip() {
  const {t} = useTranslation(['chat']);
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
      heading: t("tipModal.confirmTitle"),
      message: (
        <Div
          display="block"
          textAlign="center"
        >
          <Span>
            {t("tipModal.confirmDescription",{value: {username: lookup, amount: Intimal.toLocaleString(tipAmount)}})}
          </Span>
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
    Toasts.success('chat:tipModal.confirmSuccess',5000,{username: lookup, amount: Intimal.toLocaleString(tipAmount)});
    Dialogs.close("primary");
  };

  return handleTip;
}
