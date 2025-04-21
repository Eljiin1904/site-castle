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
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Utility } from "@client/services/utility";
import { Users } from "#app/services/users";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const VerificationOneWholeForm = ({
  layout,
  disableClose,
}: {
  layout: Layout;
  disableClose?: boolean;
}) => {
  const {t} = useTranslation(["validations","fields","common"]);
  const small = layout === "mobile";

  const form = useForm({
    schema: Validation.object({
      firstName: Validation.string()
        .max(32,{key:"validations.string.max", value: {
          label: t("fields:name.first"),
          max: 32,
        }})
        .required({key:"validations.mixed.required",value: t("fields:name.first")}),
      lastName: Validation.string()
        .max(32,{key:"validations.string.max", value: {
          label: t("fields:name.last"),
          max: 32,
        }})
        .required({key:"validations.mixed.required",value: t("fields:name.last")}),
      dob: Validation.dob(t("fields:dob.field")),
      address: Validation.string()
       .max(256,{key:"validations.string.max", value: {
          label: t("fields:address.address"),
          max: 256,
        }})
        .required({key:"validations.mixed.required",value: t("fields:address.address")}),
      city: Validation.string()
        .max(32,{key:"validations.string.max", value: {
          label: t("fields:address.city"),
          max: 32,
        }})
        .required({key:"validations.mixed.required",value: t("fields:address.city")}),
      state: Validation.string()
        .max(32,{key:"validations.string.max", value: {
          label: t("fields:address.state"),
          max: 32,
        }})
        .required({key:"validations.mixed.required",value: t("fields:address.state")}),
      countryIndex: Validation.integer("Country"),
      zipCode: Validation.string()
        .max(16,{key:"validations.string.max", value: {
          label: t("fields:address.zip"),
          max: 16,
        }})
        .required({key:"validations.mixed.required",value: t("fields:address.zip")}),
        occupation: Validation.string()
        .max(32,{key:"validations.string.max", value: {
          label: t("fields:occupation.field"),
          max: 32,
        }})
        .required({key:"validations.mixed.required",value: t("fields:occupation.field")})
    }),
    onSubmit: async (values) => {
      await Users.verifyTier1(values);

      Toasts.success("register.verificationSubmitted");

      if (!disableClose) {
        Dialogs.close("primary");
      }
    },
  });

  return (
    <Form form={form}>
      <Div
        gap={small ? 24 : 16}
        flexFlow={small ? "row-wrap" : undefined}
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
      </Div>
      <ModalSection>
        <ModalLabel>{t("fields:dob.field")}</ModalLabel>
        <Input
          type="dob"
          error={form.errors.dob?.key ? t(form.errors.dob.key, {value: form.errors.dob.value}) : undefined}
          value={form.values.dob}
          onChange={(x) => form.setValue("dob", x)}
        />
      </ModalSection>
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
      <Div
        fx
        justify="flex-start"
      >
        <Button
          type="submit"
          kind="primary-yellow"
          label={t("common:submit")}
          width={layout === "mobile" ? "full" : 128}
          loading={form.loading}
        />
      </Div>
    </Form>
  );
};
