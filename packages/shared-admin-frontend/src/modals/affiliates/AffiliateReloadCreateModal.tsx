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
import { Affiliates } from "#app/services/affiliates";

export const AffiliateReloadCreateModal = ({
  onSuccess,
}: {
  onSuccess: () => void;
}) => {
  const form = useForm({
    schema: Validation.object({
      userLookup: Validation.string().required("User Lookup is required."),
      tokenAmount: Validation.currency("Token amount"),
      claimCount: Validation.integer("Claim count").min(1),
      resetDate: Validation.date().required("Reset date is required."),
    }),
    onSubmit: async (values) => {
      await Affiliates.createReload(values);
      onSuccess();
      Toasts.success("Reload created.");
      Dialogs.close("primary");
    },
  });

  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Create Reload"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Form form={form}>
          <ModalSection>
            <ModalLabel>{"User"}</ModalLabel>
            <Input
              type="text"
              placeholder="Enter username, user ID, or email..."
              disabled={form.loading}
              error={form.errors.userLookup}
              value={form.values.userLookup}
              onChange={(x) => form.setValue("userLookup", x)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"First Claim Date"}</ModalLabel>
            <Input
              type="date"
              format="MM/dd/yyyy, h:mm aa"
              placeholder="Enter first claim date..."
              showTimeSelect
              disabled={form.loading}
              error={form.errors.resetDate}
              value={form.values.resetDate}
              onChange={(x) => form.setValue("resetDate", x)}
            />
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
              error={form.errors.resetDate}
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
              error={form.errors.tokenAmount}
              value={form.values.tokenAmount}
              onChange={(x) => form.setValue("tokenAmount", x)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Claim Count"}</ModalLabel>
            <Input
              type="integer"
              placeholder="Enter claim count..."
              disabled={form.loading}
              error={form.errors.claimCount}
              value={form.values.claimCount}
              onChange={(x) => form.setValue("claimCount", x)}
            />
          </ModalSection>
          <Button
            type="submit"
            kind="primary"
            label="Create Reload"
            fx
            loading={form.loading}
          />
        </Form>
      </ModalBody>
    </Modal>
  );
};
