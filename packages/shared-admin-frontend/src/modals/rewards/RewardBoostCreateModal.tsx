import { Validation } from "@core/services/validation";
import { Strings } from "@core/services/strings";
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
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Rewards } from "#app/services/rewards";

const timeframes = Rewards.boostTimeframes.filter((x) => x !== "daily");

export const RewardBoostCreateModal = ({
  onSuccess,
}: {
  onSuccess: () => void;
}) => {
  const form = useForm({
    schema: Validation.object({
      timeIndex: Validation.number().required(),
      startDate: Validation.date()
        .min(new Date(), "Start date must be in the future.")
        .required("Start date is required."),
      endDate: Validation.date()
        .min(Validation.ref("startDate"), "End date must be after start date.")
        .required("End date is required."),
    }),
    initialValues: {
      timeIndex: 0,
    },
    onSubmit: async ({ timeIndex, ...values }) => {
      await Rewards.createBoostEvent({
        ...values,
        timeframe: timeframes[timeIndex],
      });
      onSuccess();
      Toasts.success("Reward boost event created.");
      Dialogs.close("primary");
    },
  });

  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Create Boost Event"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody overflow={undefined}>
        <Form form={form}>
          <ModalSection>
            <ModalLabel>{"Timeframe"}</ModalLabel>
            <Dropdown
              type="select"
              fx
              options={timeframes.map((x) => Strings.kebabToTitle(x))}
              disabled={form.loading}
              value={form.values.timeIndex || 0}
              onChange={(x, i) => form.setValue("timeIndex", i)}
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
          <Button
            type="submit"
            kind="primary"
            label="Create Event"
            fx
            loading={form.loading}
          />
        </Form>
      </ModalBody>
    </Modal>
  );
};
