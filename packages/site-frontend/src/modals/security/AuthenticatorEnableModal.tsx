import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { saveAs } from "file-saver";
import { Validation } from "@core/services/validation";
import { Form } from "@client/comps/form/Form";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { useForm } from "@client/comps/form/useForm";
import { Input } from "@client/comps/input/Input";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Span } from "@client/comps/span/Span";
import { Spinner } from "@client/comps/spinner/Spinner";
import { Vector } from "@client/comps/vector/Vector";
import { useMount } from "@client/hooks/system/useMount";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { SvgCopy } from "@client/svgs/common/SvgCopy";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { OrderedList } from "@client/comps/list/OrderedList";
import { Security } from "#app/services/security";
import { AuthenticatorSettingsModal } from "./AuthenticatorSettingsModal";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";

type SecretData = Awaited<ReturnType<typeof Security.getAuthenticatorSecret>>;

export const AuthenticatorEnableModal = () => {
  const [downloaded, setDownloaded] = useState(false);
  const [data, setData] = useState<SecretData>();
  const {t} = useTranslation(["validations"]);

  const form = useForm({
    schema: Validation.object({
      tfac: Validation.tfac(),
    }),
    onSubmit: async (values) => {
      await Security.authenticatorEnable(values);
      Toasts.success(`account:settings.authenticator.enableModal.success`);
      Dialogs.open("primary", <AuthenticatorSettingsModal />);
    },
  });

  useMount(async () => {
    const res = await Security.getAuthenticatorSecret();
    setData(res);
  });

  const downloadBackup = () => {
    const blob = new Blob(
      [
        t('account:settings.authenticator.keyFile.line1') +
          "\n\n" +
          t('account:settings.authenticator.keyFile.line2') +
          "\n\n" +
          data!.recoveryKey +
          "\n\n" +
          t('account:settings.authenticator.keyFile.line3'),
      ],
      {
        type: "text/plain;charset=utf-8",
      },
    );
    saveAs(blob, `castle_backup_key.txt`);
    setDownloaded(true);
  };
  
  return (
    <Modal
      className="AuthenticatorEnableModal"
      width="lg"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading={t('account:settings.authenticator.enableModal.header')}
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody pt={0}>
        <ModalSection borderTop borderColor="brown-4" pt={24}>
          <Span>{t('account:settings.authenticator.enableModal.description')}</Span>
        </ModalSection>
        <Form form={form}>
          <Div
            fx
            column
            gap={12}
          >
            <CodeBox data={data} />
          </Div>
          <ModalSection>
            <ModalLabel>{t('account:settings.authenticator.enableModal.secretKey')}</ModalLabel>
            <Div>
            <Input
              type="password"
              placeholder={t('fields:auth.placeholder')}
              maxLength={6}              
              value={data?.secret ?? ''}
              onChange={() => {}}
            />
            <Button
              label={t('common:copy')}
              kind="tertiary-grey"
              onClick={() => {
                navigator.clipboard.writeText(data?.secret ?? '');
                Toasts.success(`account:settings.authenticator.enableModal.copied`);
              }}
            />
            </Div>
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t('fields:auth.field')}</ModalLabel>
            <Input
              type="text"
              placeholder={t('fields:auth.placeholder')}
              maxLength={6}
              disabled={form.loading}
              error={
                form.errors.tfac?.key
                  ? t(form.errors.tfac.key, { value: form.errors.tfac.value })
                  : undefined
              }
              value={form.values.tfac}
              onChange={(x) => form.setValue("tfac", x)}
            />
          </ModalSection>
          <Div
            column
            gap={12}
          >
            <ModalLabel>{t('account:settings.authenticator.enableModal.saveKey')}</ModalLabel>
            <Button
              kind="tertiary-grey"
              label={t(`account:settings.authenticator.enableModal.${downloaded ? "saved" : "action"}`)}
              loading={form.loading}
              fx
              onClick={downloadBackup}
            />
            <Button
              type="submit"
              kind="primary-yellow"
              label={t("common:enable")}
              fx
              loading={form.loading}
              disabled={!downloaded}
            />
          </Div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

const CodeBox = ({ data }: { data: SecretData | undefined }) => {
  const {t} = useTranslation(["account"]);
  const small = useIsMobileLayout();
  if (!data) {
    return (
      <Div
        fx
        center
        style={{ height: "178px" }}
      >
        <Spinner size={100} />
      </Div>
    );
  }
  return (
    <Div
      center
      border={!small}
      borderColor="brown-4"
      justifyContent="space-between"
      column={small}
    >
      <Div
        p={12}
        bg="white"
      >
        <QRCodeSVG value={data.uri} />
      </Div>
      <Div
        center
        px={small ? 0: 32}
        py={small ? 20: 32}
        hover="highlight"
        onClick={() => {
          navigator.clipboard.writeText(data.secret);
          Toasts.success(`account:settings.authenticator.enableModal.copied`);
        }}
      >
        <Span>{t('account:settings.authenticator.enableModal.scan')}</Span>
      </Div>
    </Div>
  );
};
