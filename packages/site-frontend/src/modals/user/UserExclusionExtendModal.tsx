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
import { NoticeCard } from "@client/comps/cards/NoticeCard";
import { Toasts } from "@client/services/toasts";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { Div } from "@client/comps/div/Div";
import { Checkbox } from "@client/comps/checkbox/Checkbox";
import { Users } from "#app/services/users";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { LoginModal } from "../login/LoginModal";

export const UserExclusionExtendModal = () => {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const dispatch = useAppDispatch();

  const form = useForm({
    schema: Validation.object({
      timeIndex: Validation.integer("Duration").min(0).max(4),
      confirmed: Validation.boolean().oneOf([true], "Confirmation is required."),
    }),
    initialValues: {
      timeIndex: 0,
      confirmed: false,
    },
    onSubmit: async (values) => {
      await Users.extendExclusion(values);
      dispatch(Users.resetUser());
      Toasts.success("Exclusion extended. You have been logged out.", 8000);
      Dialogs.close("primary");
    },
  });

  if (!authenticated) {
    return <LoginModal />;
  }
  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Extend Self-Exclusion"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Form form={form}>
          <ModalSection>
            <Paragraph>
              {
                "If you need a longer break, you can extend your self-exclusion. Once extended, you will be locked out of your account until it ends."
              }
            </Paragraph>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Duration"}</ModalLabel>
            <Dropdown
              type="select"
              fx
              options={["1 Day", "1 Week", "1 Month", "3 Months", "Indefinite"]}
              disabled={form.loading}
              value={form.values.timeIndex || 0}
              onChange={(x, i) => form.setValue("timeIndex", i)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Site Balance"}</ModalLabel>
            <Paragraph mb={12}>
              {
                "While you are locked out of your account, you will not have access to your site balance. You must withdraw your balance before proceeding."
              }
            </Paragraph>
            <Checkbox
              bg
              label="I have withdrawn my balance"
              disabled={form.loading}
              error={form.errors.confirmed}
              value={form.values.confirmed}
              onChange={(x) => form.setValue("confirmed", x)}
            />
          </ModalSection>
          <Div
            fx
            column
            gap={12}
          >
            <NoticeCard
              kind="warning"
              message="Support will not reverse this. You must wait for your self-exclusion to end once it starts."
            />
            <NoticeCard
              kind="info"
              message="You will be logged out of your account."
            />
          </Div>
          <Button
            type="submit"
            kind="primary"
            label="Extend Self-Exclusion"
            fx
            loading={form.loading}
          />
        </Form>
      </ModalBody>
    </Modal>
  );
};
