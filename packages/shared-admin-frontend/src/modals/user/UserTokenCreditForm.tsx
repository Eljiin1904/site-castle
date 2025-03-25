import { useQueryClient } from "@tanstack/react-query";
import { Validation } from "@core/services/validation";
import { useForm } from "@client/comps/form/useForm";
import { Form } from "@client/comps/form/Form";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Input } from "@client/comps/input/Input";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Button } from "@client/comps/button/Button";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { UserDocument } from "@core/types/users/UserDocument";
import { Intimal } from "@core/services/intimal";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { Strings } from "@core/services/strings";
import { Admin } from "#app/services/admin";
import { Users } from "#app/services/users";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const UserTokenCreditForm = ({ user }: { user: UserDocument }) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation(["validations"]);

  const form = useForm({
    schema: Validation.object({
      tokenAmount: Validation.currency("Credit Amount"),
      adjustmentIndex: Validation.number().required(),
    }),
    initialValues: {
      adjustmentIndex: 0,
    },
    onSubmit: async ({ adjustmentIndex, tokenAmount }) => {
      await Users.creditTokens({
        userId: user._id,
        adjustment: Admin.creditAdjustments[adjustmentIndex],
        tokenAmount,
      });

      Toasts.success(`User credited ${Intimal.toLocaleString(tokenAmount)} tokens.`);
      Dialogs.close("primary");

      queryClient.invalidateQueries({ queryKey: ["user", user._id] });
    },
  });

  return (
    <Form form={form}>
      <ModalSection>
        <ModalLabel>{"Adjustment"}</ModalLabel>
        <Dropdown
          type="select"
          fx
          options={Admin.creditAdjustments.map(Strings.kebabToTitle)}
          disabled={form.loading}
          value={form.values.adjustmentIndex}
          onChange={(x, i) => form.setValue("adjustmentIndex", i)}
        />
      </ModalSection>
      <ModalSection>
        <ModalLabel>{"Credit Amount"}</ModalLabel>
        <Input
          type="currency"
          placeholder="Enter credit amount..."
          disabled={form.loading}
          error={
            form.errors.tokenAmount?.key
              ? t(form.errors.tokenAmount.key, { value: form.errors.tokenAmount.value })
              : undefined
          }
          value={form.values.tokenAmount}
          onChange={(x) => form.setValue("tokenAmount", x)}
        />
      </ModalSection>
      <Button
        type="submit"
        kind="primary"
        label="Credit Balance"
        fx
        loading={form.loading}
      />
    </Form>
  );
};
