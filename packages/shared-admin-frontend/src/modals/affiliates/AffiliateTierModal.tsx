import { useQueryClient } from "@tanstack/react-query";
import { Validation } from "@core/services/validation";
import { Numbers } from "@core/services/numbers";
import { UserDocument } from "@core/types/users/UserDocument";
import { Button } from "@client/comps/button/Button";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { Form } from "@client/comps/form/Form";
import { useForm } from "@client/comps/form/useForm";
import { Affiliates } from "#app/services/affiliates";

export const AffiliateTierModal = ({ user }: { user: UserDocument }) => {
  const userId = user._id;
  const queryClient = useQueryClient();

  const options = Affiliates.tiers.map((x, i) => {
    if (i === 0) {
      return "No Base Tier";
    } else {
      return `Tier ${i} - ${Numbers.round(x.rate * 100, 2)}%`;
    }
  });

  const form = useForm({
    schema: Validation.object({
      baseTier: Validation.integer("Base tier"),
    }),
    initialValues: {
      baseTier: user.affiliate.baseTier || 0,
    },
    onSubmit: async ({ baseTier }) => {
      await Affiliates.setBaseTier({
        userId,
        baseTier: baseTier === 0 ? undefined : baseTier,
      });

      Toasts.success("Base tier changed.");
      Dialogs.close("primary");

      queryClient.invalidateQueries({ queryKey: ["user", user._id] });
    },
  });

  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Edit Base Tier"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody overflow={undefined}>
        <Form form={form}>
          <ModalSection>
            <ModalLabel>{"Base Tier"}</ModalLabel>
            <Dropdown
              type="select"
              options={options}
              value={form.values.baseTier}
              onChange={(x, i) => form.setValue("baseTier", i)}
            />
          </ModalSection>
          <Button
            type="submit"
            kind="primary"
            label="Submit"
            fx
            loading={form.loading}
          />
        </Form>
      </ModalBody>
    </Modal>
  );
};
