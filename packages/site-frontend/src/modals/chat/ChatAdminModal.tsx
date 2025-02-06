import { Fragment, useEffect } from "react";
import { addHours } from "date-fns";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { ChatMessageDocument } from "@core/types/chat/ChatMessageDocument";
import { Div } from "@client/comps/div/Div";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { Input } from "@client/comps/input/Input";
import { Checkbox } from "@client/comps/checkbox/Checkbox";
import { Button } from "@client/comps/button/Button";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Strings } from "@core/services/strings";
import { Validation } from "@core/services/validation";
import { useForm } from "@client/comps/form/useForm";
import { Toasts } from "@client/services/toasts";
import { Form } from "@client/comps/form/Form";
import { waitForConfirmation } from "@client/modals/confirm/ConfirmModal";
import { ChatMessageCard } from "#app/comps/chat-message/ChatMessageCard";
import { Users } from "#app/services/users";
import { Chat } from "#app/services/chat";

export const ChatAdminModal = ({
  message,
}: {
  message: ChatMessageDocument;
}) => {
  const form = useForm({
    schema: Validation.object({
      deleteMessage: Validation.boolean().required(),
      muteUser: Validation.boolean().required(),
      reasonIndex: Validation.number().required(),
      endDate: Validation.dateConditional("muteUser", "End date"),
    }),
    initialValues: {
      muteUser: false,
      deleteMessage: false,
      reasonIndex: 0,
    },
    onSubmit: async ({ deleteMessage, muteUser, reasonIndex, endDate }) => {
      let confirmText = "Are you sure? This will ";

      if (deleteMessage && muteUser) {
        confirmText += "delete the message and mute the user.";
      } else if (deleteMessage) {
        confirmText += "delete the message.";
      } else if (muteUser) {
        confirmText += "mute the user.";
      }

      const confirmed = await waitForConfirmation({
        heading: "Confirm Moderation",
        message: confirmText,
      });

      if (!confirmed) {
        return;
      }

      await Chat.moderate({
        messageId: message._id,
        deleteMessage,
        muteUser,
        reason: Users.muteReasons[reasonIndex],
        endDate,
      });

      Toasts.success("Moderation submitted.");
      Dialogs.close("primary");
    },
  });

  useEffect(() => console.log(form.errors), [form]);

  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Moderate Chat"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <Form form={form}>
        <ModalBody>
          <ChatMessageCard
            message={message}
            disableMenu
          />
          <Div
            fx
            borderTop
          />
          <ModalSection>
            <Checkbox
              value={form.values.deleteMessage}
              label="Delete Message"
              onChange={(x) => form.setValue("deleteMessage", x)}
            />
          </ModalSection>
          <ModalSection>
            <Checkbox
              value={form.values.muteUser}
              label="Mute User"
              onChange={(x) => form.setValue("muteUser", x)}
            />
          </ModalSection>
          {form.values.muteUser && (
            <Fragment>
              <ModalSection>
                <ModalLabel>{"Mute Reason"}</ModalLabel>
                <Dropdown
                  type="select"
                  fx
                  options={Users.muteReasons.map(Strings.kebabToTitle)}
                  disabled={form.loading}
                  value={form.values.reasonIndex || 0}
                  onChange={(x, i) => form.setValue("reasonIndex", i)}
                />
              </ModalSection>
              <ModalSection>
                <ModalLabel>{"Mute Duration"}</ModalLabel>
                <Div
                  mt={8}
                  gap={8}
                >
                  <Button
                    kind="secondary"
                    size="sm"
                    label="1H"
                    labelSize={12}
                    fx
                    loading={form.loading}
                    onClick={() =>
                      form.setValue("endDate", addHours(Date.now(), 1))
                    }
                  />
                  <Button
                    kind="secondary"
                    size="sm"
                    label="2H"
                    labelSize={12}
                    fx
                    loading={form.loading}
                    onClick={() =>
                      form.setValue("endDate", addHours(Date.now(), 2))
                    }
                  />
                  <Button
                    kind="secondary"
                    size="sm"
                    label="4H"
                    labelSize={12}
                    fx
                    loading={form.loading}
                    onClick={() =>
                      form.setValue("endDate", addHours(Date.now(), 4))
                    }
                  />
                  <Button
                    kind="secondary"
                    size="sm"
                    label="8H"
                    labelSize={12}
                    fx
                    loading={form.loading}
                    onClick={() =>
                      form.setValue("endDate", addHours(Date.now(), 8))
                    }
                  />
                  <Button
                    kind="secondary"
                    size="sm"
                    label="24H"
                    labelSize={12}
                    fx
                    loading={form.loading}
                    onClick={() =>
                      form.setValue("endDate", addHours(Date.now(), 24))
                    }
                  />
                </Div>
              </ModalSection>
              <ModalSection>
                <ModalLabel>{"Mute Until"}</ModalLabel>
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
            disabled={
              (!form.values.deleteMessage && !form.values.muteUser) ||
              form.loading
            }
            fx
          />
        </ModalBody>
      </Form>
    </Modal>
  );
};
