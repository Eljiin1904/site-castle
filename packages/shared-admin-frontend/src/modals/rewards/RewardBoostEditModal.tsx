import { Validation } from "@core/services/validation";
import { RewardBoostEventDocument } from "@core/types/rewards/RewardBoostEventDocument";
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
import { Rewards } from "#app/services/rewards";

export const RewardBoostEditModal = ({
  event,
  onSuccess,
}: {
  event: RewardBoostEventDocument;
  onSuccess: () => void;
}) => {
  const form = useForm({
    schema: Validation.object({
      startDate: Validation.date().required("Start date is required."),
      endDate: Validation.date()
        .min(Validation.ref("startDate"), "End date must be after start date.")
        .required("End date is required."),
    }),
    initialValues: {
      startDate: event.startDate,
      endDate: event.endDate,
    },
    onSubmit: async (values) => {
      await Rewards.editBoostEvent({
        ...values,
        eventId: event._id,
      });
      onSuccess();
      Toasts.success("Reward boost event updated.");
      Dialogs.close("primary");
    },
  });

  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Update Boost Event"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody overflow={undefined}>
        <Form form={form}>
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
          <Button
            type="submit"
            kind="primary"
            label="Update Event"
            fx
            loading={form.loading}
          />
        </Form>
      </ModalBody>
    </Modal>
  );
};
