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
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading={t('account:settings.authenticator.enableModal.header')}
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <Form form={form}>
          <Div
            fx
            column
            gap={12}
          >
            <CodeBox data={data} />
          </Div>
          <ModalSection>
            <OrderedList
              pl={16}
              items={[
                t('account:settings.authenticator.enableModal.steps.step1'),
                t('account:settings.authenticator.enableModal.steps.step2'),
                t('account:settings.authenticator.enableModal.steps.step3')
              ]}
            />
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
      column
      center
    >
      <Div
        p={12}
        bg="white"
      >
        <QRCodeSVG value={data.uri} />
      </Div>
      <Div
        center
        mt={8}
        hover="highlight"
        onClick={() => {
          navigator.clipboard.writeText(data.secret);
          Toasts.success(`account:settings.authenticator.enableModal.copied`);
        }}
      >
        <Span color="light-sand">{data.secret}</Span>
        <Vector
          as={SvgCopy}
          fontSize={18}
          color="sand"
          ml={8}
        />
      </Div>
    </Div>
  );
};
