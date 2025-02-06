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

type SecretData = Awaited<ReturnType<typeof Security.getAuthenticatorSecret>>;

export const AuthenticatorEnableModal = () => {
  const [downloaded, setDownloaded] = useState(false);
  const [data, setData] = useState<SecretData>();

  const form = useForm({
    schema: Validation.object({
      tfac: Validation.tfac(),
    }),
    onSubmit: async (values) => {
      await Security.authenticatorEnable(values);
      Toasts.success("Authenticator enabled.");
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
        "!!! DO NOT SHARE THIS KEY !!!" +
          "\n\n" +
          "Your backup key is:" +
          "\n\n" +
          data!.recoveryKey +
          "\n\n" +
          "Keep this in a safe place and use it if you lose access to your authenticator.",
      ],
      {
        type: "text/plain;charset=utf-8",
      },
    );
    saveAs(blob, `chicken_backup_key.txt`);
    setDownloaded(true);
  };

  return (
    <Modal
      className="AuthenticatorEnableModal"
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Enable Authenticator"
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
                "Scan the QR code or enter the setup key manually.",
                "Enter the 6-digit code from the authenticator.",
                "Save your backup key and use it if you lose access to the authenticator.",
              ]}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Authenticator Code"}</ModalLabel>
            <Input
              type="text"
              placeholder="Enter 6-digit code..."
              maxLength={6}
              disabled={form.loading}
              error={form.errors.tfac}
              value={form.values.tfac}
              onChange={(x) => form.setValue("tfac", x)}
            />
          </ModalSection>
          <Div
            column
            gap={12}
          >
            <Button
              kind="secondary"
              label={downloaded ? "Saved!" : "Save Backup Key"}
              loading={form.loading}
              fx
              onClick={downloadBackup}
            />
            <Button
              type="submit"
              kind="primary"
              label="Enable"
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
          Toasts.success("Setup key copied to clipboard.");
        }}
      >
        <Span color="gray">{data.secret}</Span>
        <Vector
          as={SvgCopy}
          fontSize={18}
          color="light-blue"
          ml={8}
        />
      </Div>
    </Div>
  );
};
