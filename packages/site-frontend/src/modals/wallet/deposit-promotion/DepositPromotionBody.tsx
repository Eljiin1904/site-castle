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
import { WalletAction } from "../WalletAction";

export const DepositPromotionBody = ({
  setAction,
}: {
  setAction: (x: WalletAction) => void;
}) => {
  const form = useCaptchaForm({
    schema: Validation.object({
      promotionId: Validation.string().required("Promotion code is required."),
    }),
    onSubmit: async (values) => {
      const { tokenAmount } = await Economy.redeemPromotion(values);
      Toasts.success(
        `You received ${Intimal.toLocaleString(tokenAmount)} tokens from the promotion.`,
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
          path="/graphics/promo-ticket"
          width="128px"
        />
      </Div>
      <NoticeCard
        kind="info"
        message="Have a Castle.com promo code? Enter the code below to claim your tokens."
      />
      <ModalSection>
        <ModalLabel>{"Promotion Code"}</ModalLabel>
        <Input
          type="text"
          id="promotion-code"
          autoComplete="one-time-code"
          placeholder="Enter promotion code..."
          disabled={form.loading}
          error={form.errors.promotionId}
          value={form.values.promotionId}
          onChange={(x) =>
            form.setValue("promotionId", x?.replace(/[^a-z0-9-_]/gi, ""))
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
