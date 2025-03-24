import { Validation } from "@core/services/validation";
import { Form } from "@client/comps/form/Form";
import { Input } from "@client/comps/input/Input";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Button } from "@client/comps/button/Button";
import { useForm } from "@client/comps/form/useForm";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { Toasts } from "@client/services/toasts";
import { Dialogs } from "@client/services/dialogs";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { Economy } from "#app/services/economy";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const GiftBatchCreateModal = ({ onSuccess }: { onSuccess: () => void }) => {
  const { t } = useTranslation(["validations"]);

  const form = useForm({
    schema: Validation.object({
      batchId: Validation.string().required("Batch ID is required."),
      batchSize: Validation.integer("Batch Size").min(0),
      tokenAmount: Validation.currency("Token Amount"),
      tagIndex: Validation.number().required(),
    }),
    initialValues: {
      tagIndex: 0,
    },
    onSubmit: async ({ tagIndex, ...values }) => {
      await Economy.createGiftBatch({
        ...values,
        tag: Economy.giftCardTags[tagIndex],
      });
      onSuccess();
      Toasts.success("Giftcard batch created.");
      Dialogs.close("primary");
    },
  });

  return (
    <Modal
      className="GiftBatchCreateModal"
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Create Gift Card Batch"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Form form={form}>
          <ModalSection>
            <ModalLabel>{"Batch ID"}</ModalLabel>
            <Input
              type="text"
              placeholder="Enter batch id..."
              disabled={form.loading}
              error={
                form.errors.batchId?.key
                  ? t(form.errors.batchId.key, { value: form.errors.batchId.value })
                  : undefined
              }
              value={form.values.batchId}
              onChange={(x) => form.setValue("batchId", x?.replace(/[^a-z0-9-]/gi, ""))}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Tag"}</ModalLabel>
            <Dropdown
              type="select"
              fx
              options={Economy.giftCardTags.map(Economy.getGiftTagName)}
              disabled={form.loading}
              value={form.values.tagIndex || 0}
              onChange={(x, i) => form.setValue("tagIndex", i)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Batch Size"}</ModalLabel>
            <Input
              type="integer"
              placeholder="Enter batch size..."
              disabled={form.loading}
              error={
                form.errors.batchSize?.key
                  ? t(form.errors.batchSize.key, { value: form.errors.batchSize.value })
                  : undefined
              }
              value={form.values.batchSize}
              onChange={(x) => form.setValue("batchSize", x)}
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
          <Button
            type="submit"
            kind="primary"
            label="Create Batch"
            fx
            loading={form.loading}
          />
        </Form>
      </ModalBody>
    </Modal>
  );
};
