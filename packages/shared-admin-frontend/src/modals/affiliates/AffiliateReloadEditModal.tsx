import { AffiliateReloadDocument } from "@core/types/affiliates/AffiliateReloadDocument";
import { Validation } from "@core/services/validation";
import { Form } from "@client/comps/form/Form";
import { Input } from "@client/comps/input/Input";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Button } from "@client/comps/button/Button";
import { useForm } from "@client/comps/form/useForm";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalField } from "@client/comps/modal/ModalField";
import { Span } from "@client/comps/span/Span";
import { Affiliates } from "#app/services/affiliates";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const AffiliateReloadEditModal = ({
  reload,
  onSuccess,
}: {
  reload: AffiliateReloadDocument;
  onSuccess: () => void;
}) => {
  const { t } = useTranslation(["validations"]);

  const form = useForm({
    schema: Validation.object({
      tokenAmount: Validation.currency("Token amount"),
      resetDate: Validation.date().required("Reset date is required."),
      claimCount: Validation.integer("Available claims").min(0),
    }),
    initialValues: {
      tokenAmount: reload.tokenAmount,
      resetDate: reload.resetDate,
      claimCount: reload.claimsAvailable,
    },
    onSubmit: async (values) => {
      await Affiliates.editReload({ reloadId: reload._id, ...values });
      onSuccess();
      Toasts.success("Reload updated.");
      Dialogs.close("primary");
    },
  });

  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Edit Reload"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Form form={form}>
          <ModalSection>
            <ModalLabel>{"User"}</ModalLabel>
            <ModalField display="block">
              <Span>{reload.user.name}</Span>
              <Span>{" ("}</Span>
              <Span color="light-blue">{reload.user.id}</Span>
              <Span>{")"}</Span>
            </ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Daily Reset Hour"}</ModalLabel>
            <Input
              type="date"
              format="h:mm aa"
              placeholder="Enter daily reset hour..."
              showTimeSelect
              showTimeSelectOnly
              disabled={form.loading}
              error={
                form.errors.resetDate?.key
                  ? t(form.errors.resetDate.key, { value: form.errors.resetDate.value })
                  : undefined
              }
              value={form.values.resetDate}
              onChange={(x) => form.setValue("resetDate", x)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Token Amount"}</ModalLabel>
            <Input
              type="currency"
              placeholder="Enter token amount..."
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
          <ModalSection>
            <ModalLabel>{"Available Claims"}</ModalLabel>
            <Input
              type="integer"
              placeholder="Enter available claims..."
              disabled={form.loading}
              error={
                form.errors.claimCount?.key
                  ? t(form.errors.claimCount.key, { value: form.errors.claimCount.value })
                  : undefined
              }
              value={form.values.claimCount}
              onChange={(x) => form.setValue("claimCount", x)}
            />
          </ModalSection>
          <Button
            type="submit"
            kind="primary"
            label="Edit Reload"
            fx
            loading={form.loading}
          />
        </Form>
      </ModalBody>
    </Modal>
  );
};
