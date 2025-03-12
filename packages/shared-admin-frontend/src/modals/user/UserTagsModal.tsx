import { useQueryClient } from "@tanstack/react-query";
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
import { ModalField } from "@client/comps/modal/ModalField";
import { Users } from "#app/services/users";

export const UserTagsModal = ({ user }: { user: UserDocument }) => {
  const userId = user._id;
  const queryClient = useQueryClient();

  const form = useForm({
    schema: Validation.object({
      filter: Validation.array().of(Validation.boolean().required()).required(),
    }),
    initialValues: {
      filter: Users.tags.map((x) => user.tags.includes(x)),
    },
    onSubmit: async ({ filter }) => {
      await Users.editTags({
        userId,
        newTags: Users.tags.filter((x, i) => filter[i]),
      });

      Toasts.success("User tags changed.");
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
        heading="Edit Tags"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody overflow={undefined}>
        <Form form={form}>
          <ModalSection>
            <ModalLabel>{"Current Tags"}</ModalLabel>
            <ModalField>
              {user.tags.map((x) => Strings.kebabToTitle(x)).join(", ") ||
                "None"}
            </ModalField>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"New Tags"}</ModalLabel>
            <Dropdown
              type="filter"
              fx
              label={
                Users.tags
                  .filter((x, i) => form.values.filter![i])
                  .map((x) => Strings.kebabToTitle(x))
                  .join(", ") || "None"
              }
              options={Users.tags.map((x) => Strings.kebabToTitle(x))}
              filter={form.values.filter!}
              disabled={form.loading}
              onChange={(x) => form.setValue("filter", x)}
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
