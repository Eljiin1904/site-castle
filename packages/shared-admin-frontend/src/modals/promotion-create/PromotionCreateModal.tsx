import { Validation } from "@core/services/validation";
import { Users } from "@core/services/users";
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
import { Economy } from "#app/services/economy";

export const PromotionCreateModal = ({
  onSuccess,
}: {
  onSuccess: () => void;
}) => {
  const form = useForm({
    schema: Validation.object({
      promotionId: Validation.string().required("Promotion ID is required."),
      tokenAmount: Validation.currency("Token Amount"),
      startDate: Validation.date()
        .min(new Date(), "Start date must be in the future.")
        .required("Start date is required."),
      endDate: Validation.date()
        .min(Validation.ref("startDate"), "End date must be after start date.")
        .required("End date is required."),
      maxUses: Validation.integer("Max Uses").min(0),
      requiredLevel: Validation.integer("Required level")
        .min(0)
        .max(Users.maxLevel),
      requiredWagerAmount: Validation.integer("Required wager amount").min(0),
      requiredWagerDays: Validation.integer("Required wager timeframe").min(0),
    }),
    initialValues: {
      requiredLevel: 0,
      requiredWagerAmount: 0,
      requiredWagerDays: 0,
    },
    onSubmit: async ({ requiredLevel, ...values }) => {
      await Economy.createPromotion({
        ...values,
        requiredXP: Users.getXP(requiredLevel),
      });
      onSuccess();
      Toasts.success("Promotion created.");
      Dialogs.close("primary");
    },
  });

  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Create Promotion"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Form form={form}>
          <ModalSection>
            <ModalLabel>{"Promotion ID"}</ModalLabel>
            <Input
              type="text"
              placeholder="Enter promotion id..."
              disabled={form.loading}
              error={form.errors.promotionId}
              value={form.values.promotionId}
              onChange={(x) =>
                form.setValue("promotionId", x?.replace(/[^a-z0-9-]/gi, ""))
              }
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
            <ModalLabel>{"Start Date"}</ModalLabel>
            <Input
              type="date"
              format="MM/dd/yyyy, HH:mm"
              placeholder="Enter start date..."
              showTimeSelect
              disabled={form.loading}
              error={form.errors.startDate}
              value={form.values.startDate}
              onChange={(x) => form.setValue("startDate", x)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"End Date"}</ModalLabel>
            <Input
              type="date"
              format="MM/dd/yyyy, HH:mm"
              placeholder="Enter end date..."
              showTimeSelect
              disabled={form.loading}
              error={form.errors.endDate}
              value={form.values.endDate}
              onChange={(x) => form.setValue("endDate", x)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Max Uses"}</ModalLabel>
            <Input
              type="integer"
              placeholder="Enter max uses..."
              disabled={form.loading}
              error={form.errors.maxUses}
              value={form.values.maxUses}
              onChange={(x) => form.setValue("maxUses", x)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Level Requirement"}</ModalLabel>
            <Input
              type="integer"
              iconLeft={undefined}
              placeholder="Enter required level..."
              disabled={form.loading}
              error={form.errors.requiredLevel}
              value={form.values.requiredLevel}
              onChange={(x) => form.setValue("requiredLevel", x)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Wager Requirement Tokens"}</ModalLabel>
            <Input
              type="currency"
              placeholder="Enter wager token amount..."
              disabled={form.loading}
              error={form.errors.requiredWagerAmount}
              value={form.values.requiredWagerAmount}
              onChange={(x) => form.setValue("requiredWagerAmount", x)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Wager Requirement Days"}</ModalLabel>
            <Input
              type="integer"
              placeholder="Enter wager days..."
              disabled={form.loading}
              error={form.errors.requiredWagerDays}
              value={form.values.requiredWagerDays}
              onChange={(x) => form.setValue("requiredWagerDays", x)}
            />
          </ModalSection>
          <Button
            type="submit"
            kind="primary"
            label="Create Promotion"
            fx
            loading={form.loading}
          />
        </Form>
      </ModalBody>
    </Modal>
  );
};
