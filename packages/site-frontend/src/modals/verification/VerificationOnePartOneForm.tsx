import { Validation } from "@core/services/validation";
import { Button } from "@client/comps/button/Button";
import { Form } from "@client/comps/form/Form";
import { useForm } from "@client/comps/form/useForm";
import { Input } from "@client/comps/input/Input";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Div } from "@client/comps/div/Div";
import { Users } from "#app/services/users";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const VerificationOnePartOneForm = ({
  layout,
  disableClose,
}: {
  layout: Layout;
  disableClose?: boolean;
}) => {
  const {t} = useTranslation(["validations","fields","common"]);
  const form = useForm({
    schema: Validation.object({
      firstName: Validation.string()
        .max(32,t("validations.string.max",{value: {label:t("fields:name.first"),max:32}}))
        .required(t("validations.mixed.required",{value:t("fields:name.first")})),
      lastName: Validation.string()
        .max(32,t("validations.string.max",{value: {label:t("fields:name.last"),max:32}}))
        .required(t("validations.mixed.required",{value:t("fields:name.last")})),
      dob: Validation.dob(t("fields:dob.field")),
    }),
    onSubmit: async (values) => {
      await Users.verifyTier1Part1(values);
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
          <ModalLabel>{t("fields:name.first")}</ModalLabel>
          <Input
            type="text"
            placeholder={t("fields:name.firstPlaceholder")}
            disabled={form.loading}
            error={form.errors.firstName?.key ? t(form.errors.firstName.key, {value: form.errors.firstName.value}) : undefined}
            value={form.values.firstName}
            onChange={(x) => form.setValue("firstName", x)}
          />
        </ModalSection>
        <ModalSection>
          <ModalLabel>{t("fields:name.last")}</ModalLabel>
          <Input
            type="text"
            placeholder={t("fields:name.lastPlaceholder")}
            disabled={form.loading}
            error={form.errors.lastName?.key ? t(form.errors.lastName.key, {value: form.errors.lastName.value}) : undefined}
            value={form.values.lastName}
            onChange={(x) => form.setValue("lastName", x)}
          />
        </ModalSection>
        <ModalSection>
          <ModalLabel>{t("fields:dob.field")}</ModalLabel>
          <Input
            type="dob"
            error={form.errors.dob?.key ? t(form.errors.dob.key, {value: form.errors.dob.value}) : undefined}
            value={form.values.dob}
            onChange={(x) => form.setValue("dob", x)}
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
          kind="primary"
          label={t("common:continue")}
          loading={form.loading}
        />
      </Div>
    </Form>
  );
};
