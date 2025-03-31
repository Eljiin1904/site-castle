import { Validation } from "@core/services/validation";
import { Button } from "@client/comps/button/Button";
import { Form } from "@client/comps/form/Form";
import { useForm } from "@client/comps/form/useForm";
import { Input } from "@client/comps/input/Input";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Div } from "@client/comps/div/Div";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Utility } from "@client/services/utility";
import { Users } from "#app/services/users";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const VerificationOnePartTwoForm = ({
  layout,
  disableClose,
}: {
  layout: Layout;
  disableClose?: boolean;
}) => {
  const {t} = useTranslation(["validations","common"]);
  const small = layout === "mobile";

  const form = useForm({
    schema: Validation.object({
      address: Validation.string()
        .max(256,t("validations.string.max",{value: {label:t("fields:address.address"),max:256}}))
        .required(t("validations.mixed.required",{value:t("fields:address.address")})),
      city: Validation.string()
        .max(32,t("validations.string.max",{value: {label:t("fields:address.city"),max:32}}))
        .required(t("validations.mixed.required",{value:t("fields:address.city")})),
      state: Validation.string()
        .max(32,t("validations.string.max",{value: {label:t("fields:address.state"),max:32}}))
        .required(t("validations.mixed.required",{value:t("fields:address.state")})),
      countryIndex: Validation.integer("Country"),
      zipCode: Validation.string()
        .max(16,t("validations.string.max",{value: {label:t("fields:address.zip"),max:16}}))
        .required(t("validations.mixed.required",{value:t("fields:address.zip")})),
    }),
    onSubmit: async (values) => {
      await Users.verifyTier1Part2(values);
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
          <ModalLabel>{t("fields:address.address")}</ModalLabel>
          <Input
            type="text"
            placeholder={t("fields:address.addressPlaceholder")}
            disabled={form.loading}
            error={form.errors.address?.key ? t(form.errors.address.key, {value: form.errors.address.value}) : undefined}
            value={form.values.address}
            onChange={(x) => form.setValue("address", x)}
          />
        </ModalSection>
        <Div
          gap={small ? 24 : 16}
          flexFlow={small ? "row-wrap" : undefined}
        >
          <ModalSection>
            <ModalLabel>{t("fields:address.city")}</ModalLabel>
            <Input
              type="text"
              placeholder={t("fields:address.cityPlaceholder")}
              disabled={form.loading}
              error={form.errors.city?.key ? t(form.errors.city.key, {value: form.errors.city.value}) : undefined}
              value={form.values.city}
              onChange={(x) => form.setValue("city", x)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t("fields:address.state")}</ModalLabel>
            <Input
              type="text"
              placeholder={t("fields:address.statePlaceholder")}
              disabled={form.loading}
              error={form.errors.state?.key ? t(form.errors.state.key, {value: form.errors.state.value}) : undefined}
              value={form.values.state}
              onChange={(x) => form.setValue("state", x)}
            />
          </ModalSection>
        </Div>
        <Div
          gap={small ? 24 : 16}
          flexFlow={small ? "row-wrap" : undefined}
        >
          <ModalSection>
            <ModalLabel>{t("fields:address.country")}</ModalLabel>
            <Dropdown
              forceDirection="top"
              type="select"
              placeholder={t("fields:address.countryPlaceholder")}
              options={Utility.supportedCountries.map((x) => x.name)}
              disabled={form.loading}
              error={form.errors.countryIndex?.key ? t(form.errors.countryIndex.key, {value: form.errors.countryIndex.value}) : undefined}
              value={form.values.countryIndex}
              onChange={(x, i) => form.setValue("countryIndex", i)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t("fields:address.zip")}</ModalLabel>
            <Input
              type="text"
              placeholder={t("fields:address.zipPlaceholder")}
              disabled={form.loading}
              error={form.errors.zipCode?.key ? t(form.errors.zipCode.key, {value: form.errors.zipCode.value}) : undefined}
              value={form.values.zipCode}
              onChange={(x) => form.setValue("zipCode", x)}
            />
          </ModalSection>
        </Div>
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
