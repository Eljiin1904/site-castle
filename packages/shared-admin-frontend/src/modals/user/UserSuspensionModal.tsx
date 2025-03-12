import { Fragment } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { addDays } from "date-fns";
import { Validation } from "@core/services/validation";
import { Strings } from "@core/services/strings";
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
import { Checkbox } from "@client/comps/checkbox/Checkbox";
import { Input } from "@client/comps/input/Input";
import { Div } from "@client/comps/div/Div";
import { Users } from "#app/services/users";

export const UserSuspensionModal = ({ user }: { user: UserDocument }) => {
  const current = user.suspension;
  const isSuspended = Users.isSuspended(current);
  const userId = user._id;
  const queryClient = useQueryClient();

  const form = useForm({
    schema: Validation.object({
      enabled: Validation.boolean().required(),
      reasonIndex: Validation.number().required(),
      endDate: Validation.dateConditional("enabled", "End date"),
    }),
    initialValues: {
      enabled: isSuspended,
      reasonIndex: isSuspended
        ? Users.suspensionReasons.indexOf(current.reason!)
        : 0,
      endDate: isSuspended ? current.endDate : undefined,
    },
    onSubmit: async ({ enabled, reasonIndex, endDate }) => {
      await Users.editSuspension({
        userId,
        enabled,
        endDate,
        reason: Users.suspensionReasons[reasonIndex],
      });

      Toasts.success("User suspension updated.");
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
        heading="Manage Suspension"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody overflow={undefined}>
        <Form form={form}>
          <ModalSection>
            <Checkbox
              value={form.values.enabled}
              label="Suspended"
              onChange={(x) => form.setValue("enabled", x)}
            />
          </ModalSection>
          {form.values.enabled && (
            <Fragment>
              <ModalSection>
                <ModalLabel>{"Reason"}</ModalLabel>
                <Dropdown
                  type="select"
                  fx
                  options={Users.suspensionReasons.map(Strings.kebabToTitle)}
                  disabled={form.loading}
                  value={form.values.reasonIndex || 0}
                  onChange={(x, i) => form.setValue("reasonIndex", i)}
                />
              </ModalSection>
              <ModalSection>
                <ModalLabel>{"Duration"}</ModalLabel>
                <Div gap={8}>
                  <Button
                    kind="secondary"
                    size="sm"
                    label="24H"
                    labelSize={12}
                    fx
                    loading={form.loading}
                    onClick={() =>
                      form.setValue("endDate", addDays(Date.now(), 1))
                    }
                  />
                  <Button
                    kind="secondary"
                    size="sm"
                    label="7D"
                    labelSize={12}
                    fx
                    loading={form.loading}
                    onClick={() =>
                      form.setValue("endDate", addDays(Date.now(), 7))
                    }
                  />
                  <Button
                    kind="secondary"
                    size="sm"
                    label="30D"
                    labelSize={12}
                    fx
                    loading={form.loading}
                    onClick={() =>
                      form.setValue("endDate", addDays(Date.now(), 30))
                    }
                  />
                  <Button
                    kind="secondary"
                    size="sm"
                    label="90D"
                    labelSize={12}
                    fx
                    loading={form.loading}
                    onClick={() =>
                      form.setValue("endDate", addDays(Date.now(), 90))
                    }
                  />
                  <Button
                    kind="secondary"
                    size="sm"
                    label="Indefinite"
                    labelSize={12}
                    fx
                    loading={form.loading}
                    onClick={() =>
                      form.setValue("endDate", addDays(Date.now(), 100000))
                    }
                  />
                </Div>
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
            </Fragment>
          )}
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
