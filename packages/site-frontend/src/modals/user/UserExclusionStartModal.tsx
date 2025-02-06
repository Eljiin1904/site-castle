import { Validation } from "@core/services/validation";
import { Button } from "@client/comps/button/Button";
import { Form } from "@client/comps/form/Form";
import { useForm } from "@client/comps/form/useForm";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Paragraph } from "@client/comps/paragraph/Paragraph";
import { UnorderedList } from "@client/comps/list/UnorderedList";
import { NoticeCard } from "@client/comps/cards/NoticeCard";
import { Toasts } from "@client/services/toasts";
import { Users } from "#app/services/users";

export const UserExclusionStartModal = () => {
  const form = useForm({
    schema: Validation.object({}),
    onSubmit: async (values) => {
      await Users.requestExclusion();
      Toasts.success(
        "Exclusion requested. Please check your email to confirm.",
        8000,
      );
      Dialogs.close("primary");
    },
  });

  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Self-Exclusion"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Form form={form}>
          <ModalSection>
            <Paragraph>
              {"If you need a break, you can request to be excluded."}
            </Paragraph>
            <br />
            <Paragraph>
              {"While excluded, you will not have access to:"}
            </Paragraph>
            <UnorderedList items={["Depositing", "Betting", "Chatting"]} />
            <Paragraph>
              {"Once confirmed, you will be excluded for 24 hours."}
            </Paragraph>
            <br />
            <Paragraph>
              {
                "We will send an email to confirm the start and the end of your self-exclusion."
              }
            </Paragraph>
          </ModalSection>
          <NoticeCard
            kind="warning"
            message="Support will not reverse this. You must wait for your self-exclusion to end once it starts."
          />
          <Button
            type="submit"
            kind="primary"
            label="Request Self-Exclusion"
            fx
            loading={form.loading}
          />
        </Form>
      </ModalBody>
    </Modal>
  );
};
