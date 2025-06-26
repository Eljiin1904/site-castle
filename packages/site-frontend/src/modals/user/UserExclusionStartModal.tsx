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
import { useTranslation } from "@core/services/internationalization/internationalization";
import { Span } from "@client/comps/span/Span";

export const UserExclusionStartModal = () => {
  const { t } = useTranslation(["account"]);
  const form = useForm({
    schema: Validation.object({}),
    onSubmit: async (values) => {
      await Users.requestExclusion();
      Toasts.success(`account:settings.selfExclusion.modal.success`, 8000);
      Dialogs.close("primary");
    },
  });

  return (
    <Modal
      width="md"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading={t("account:settings.selfExclusion.title")}
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Form form={form}>
          <ModalSection>
            <Paragraph>
              {t("account:settings.selfExclusion.modal.description1")}
            </Paragraph>
            <br />
            <Paragraph>
              {t("account:settings.selfExclusion.modal.description2")}
            </Paragraph>
            <UnorderedList items={[t("account:settings.selfExclusion.modal.list.1"),
              t("account:settings.selfExclusion.modal.list.2"),
              t("account:settings.selfExclusion.modal.list.3")]} />
            <Paragraph>
            {t("account:settings.selfExclusion.modal.description3")}
            </Paragraph>
            <br />
            <Paragraph>
              {t("account:settings.selfExclusion.modal.description4")}
            </Paragraph>
          </ModalSection>
          <ModalSection borderTop borderColor="brown-4" pt={24} gap={16}>
            <Span textTransform="uppercase" color="error-red">{t("account:settings.selfExclusion.modal.attention")}</Span>
            <Paragraph>
              {t("account:settings.selfExclusion.modal.warning")}
            </Paragraph>
          </ModalSection>
          <Button
            type="submit"
            kind="primary-yellow"
            label={t("account:settings.selfExclusion.modal.action")}
            fx
            loading={form.loading}
          />
        </Form>
      </ModalBody>
    </Modal>
  );
};
