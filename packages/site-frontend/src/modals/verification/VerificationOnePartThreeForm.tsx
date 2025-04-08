import { Validation } from "@core/services/validation";
import { Button } from "@client/comps/button/Button";
import { Form } from "@client/comps/form/Form";
import { useForm } from "@client/comps/form/useForm";
import { Input } from "@client/comps/input/Input";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { Div } from "@client/comps/div/Div";
import { Users } from "#app/services/users";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const VerificationOnePartThreeForm = ({
  layout,
  disableClose,
}: {
  layout: Layout;
  disableClose?: boolean;
}) => {
  const {t} = useTranslation(["validations","common","fields"]); 
  const form = useForm({
    schema: Validation.object({
      occupation: Validation.string()
      .max(32,t("validations.string.max",{value: {label:t("fields:occupation.field"),max:32}}))
      .required(t("validations.mixed.required",{value:t("fields:occupation.field")})),
    }),
    onSubmit: async (values) => {
      await Users.verifyTier1Part3(values);

      Toasts.success(t("accountSetup.completed"));

      if (!disableClose) {
        Dialogs.close("primary");
      }
    },
  });

  return (
    <Form
      grow
      form={form}
    >
      <Div
        fx
        column
        grow
        gap={24}
      >
        <ModalSection>
          <ModalLabel>{t("fields:occupation.field")}</ModalLabel>
          <Input
            type="text"
            placeholder={t("fields:occupation.placeholder")}
            disabled={form.loading}
            error={form.errors.occupation?.key ? t(form.errors.occupation.key, {value: form.errors.occupation.value}) : undefined}
            value={form.values.occupation}
            onChange={(x) => form.setValue("occupation", x)}
          />
        </ModalSection>
      </Div>
      <Div
        fx
        justify="flex-end"
      >
        <Button
          fx
          type="submit"
          kind="primary-yellow"
          label={t("common:startPlaying")}
          loading={form.loading}
        />
      </Div>
    </Form>
  );
};
