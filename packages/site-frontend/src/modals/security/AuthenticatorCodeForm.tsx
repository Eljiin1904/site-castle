import { Validation } from "@core/services/validation";
import { useForm } from "@client/comps/form/useForm";
import { Form } from "@client/comps/form/Form";
import { Link } from "@client/comps/link/Link";
import { Button } from "@client/comps/button/Button";
import { Input } from "@client/comps/input/Input";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Dialogs } from "@client/services/dialogs";
import { AuthenticatorRecoverModal } from "./AuthenticatorRecoverModal";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const AuthenticatorCodeForm = ({
  userId,
  notice,
  onSubmit,
}: {
  userId?: string;
  notice?: JSX.Element;
  onSubmit: (values: { tfac: string }) => void;
}) => {
  const form = useForm({
    schema: Validation.object({
      tfac: Validation.tfac(),
    }),
    onSubmit,
  });

  const {t} = useTranslation(["validations"]);
  return (
    <Form form={form}>
      <ModalSection borderTop borderColor="brown-4" pt={24}>
        <ModalLabel>
          {t("fields:auth.field")}
          <Link
            type="action"
            flexGrow
            justifyContent="flex-end"
            onClick={() => {
              Dialogs.close("secondary");
              Dialogs.open(
                "primary",
                <AuthenticatorRecoverModal userId={userId} />,
              );
            }}
          >
            {t("account:settings.authenticator.disableModal.lostAccess")}
          </Link>
        </ModalLabel>
        <Input
          type="text"
          placeholder={t("fields:auth.placeholder")}
          maxLength={6}
          disabled={form.loading}
          error={
            form.errors.tfac?.key
              ? t(form.errors.tfac.key, { value: form.errors.tfac.value })
              : undefined
          }
          value={form.values.tfac}
          onChange={(x) => form.setValue("tfac", x?.replace(/[^0-9]/gi, ""))}
        />
      </ModalSection>
      {notice}
      <Button
        type="submit"
        kind="primary-yellow"
        label= {t("account:settings.authenticator.disableModal.action")}
        fx
        loading={form.loading}
      />
    </Form>
  );
};
