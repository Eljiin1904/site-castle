import { Intimal } from "@core/services/intimal";
import { Validation } from "@core/services/validation";
import { Button } from "@client/comps/button/Button";
import { Input } from "@client/comps/input/Input";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { Div } from "@client/comps/div/Div";
import { NoticeCard } from "@client/comps/cards/NoticeCard";
import { Img } from "@client/comps/img/Img";
import { CaptchaForm } from "#app/comps/captcha-form/CaptchaForm";
import { useCaptchaForm } from "#app/comps/captcha-form/useCaptchaForm";
import { Economy } from "#app/services/economy";
import { Gtm } from "#app/services/gtm";
import { WalletAction } from "../WalletAction";

export const DepositGiftCardBody = ({
  setAction,
}: {
  setAction: (x: WalletAction) => void;
}) => {
  const form = useCaptchaForm({
    schema: Validation.object({
      cardId: Validation.string().required("Gift card code is required."),
    }),
    onSubmit: async (values) => {
      const res = await Economy.redeemGiftCard(values);

      Gtm.trackDeposit({
        transactionId: res.transactionId,
        tokenAmount: res.tokenAmount,
        ftd: res.ftd,
      });

      Toasts.success(
        `You received ${Intimal.toLocaleString(res.tokenAmount)} tokens from the gift card.`,
      );

      Dialogs.close("primary");
    },
  });

  return (
    <CaptchaForm
      form={form}
      grow
    >
      <Div center>
        <Img
          type="png"
          path="/graphics/gift-card"
          width="128px"
        />
      </Div>
      <NoticeCard
        kind="info"
        message="Have a Castle.com gift card? Enter the code below to claim your tokens."
      />
      <ModalSection>
        <ModalLabel>{"Gift Card Code"}</ModalLabel>
        <Input
          type="text"
          id="gift-card-code"
          autoComplete="one-time-code"
          placeholder="Enter gift card code..."
          disabled={form.loading}
          error={form.errors.cardId}
          value={form.values.cardId}
          onChange={(x) =>
            form.setValue(
              "cardId",
              x?.replace(/[^a-z0-9-]/gi, "").toUpperCase(),
            )
          }
        />
      </ModalSection>
      <Button
        type="submit"
        kind="primary"
        label="Redeem"
        fx
        loading={form.loading}
      />
      <Div
        fx
        grow
        align="flex-end"
      >
        <Button
          kind="secondary"
          label="Back to Options"
          fx
          onClick={() => setAction("deposit")}
        />
      </Div>
    </CaptchaForm>
  );
};
