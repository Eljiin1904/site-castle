import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Divider } from "@client/comps/divider/Divider";
import { Input } from "@client/comps/input/Input";
import { Span } from "@client/comps/span/Span";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { saveAs } from "file-saver";
import { Validation } from "@core/services/validation";
import { Form } from "@client/comps/form/Form";
import { useForm } from "@client/comps/form/useForm";
import { Security } from "#app/services/security";
import { TwoFactorEnabled } from "./TwoFactorEnabled";
import { useMount } from "@client/hooks/system/useMount";
import { Toasts } from "@client/services/toasts";
import { Vector } from "@client/comps/vector/Vector";
import { SvgCopy } from "@client/svgs/common/SvgCopy";
import { Spinner } from "@client/comps/spinner/Spinner";
import { Dialogs } from "@client/services/dialogs";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { AuthenticatorDisableModal } from "#app/modals/security/AuthenticatorDisableModal";

type SecretData = Awaited<ReturnType<typeof Security.getAuthenticatorSecret>>;

export const ProfileSecurity = () => {
  const tfaEnabled = useAppSelector((x) => x.user.tfa.enabled);

  const [downloaded, setDownloaded] = useState(false);
  const [data, setData] = useState<SecretData>();

  const form = useForm({
    schema: Validation.object({
      tfac: Validation.tfac(),
    }),
    onSubmit: async (values) => {
      await Security.authenticatorEnable(values);
      Toasts.success("Authenticator enabled.");
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
    saveAs(blob, `castle_backup_key.txt`);
    setDownloaded(true);
  };

  const handleTwoFactorState = () => {
    Dialogs.open("primary", tfaEnabled ? <AuthenticatorDisableModal /> : null);
  };
  if (tfaEnabled) return <TwoFactorEnabled handleTwoFactorDisable={handleTwoFactorState} />;
  return (
    <Div
      width={"full"}
      column
    >
      <Span
        textTransform="uppercase"
        color="white"
        fontSize={24}
      >
        Security (2FA)
      </Span>
      <Form form={form}>
        <Span
          color="dark-sand"
          mt={16}
        >
          Download and install{" "}
          <Span
            textDecoration="underline"
            color="sand"
          >
            Google Autheticator.
          </Span>{" "}
          Enable Two-factor Authentication to protect your account from unauthorized access.
        </Span>

        <Div
          fx
          column
          gap={12}
        >
          <CodeBox data={data} />
        </Div>

        <Divider
          as={"div"}
          px={16}
          my={16}
          borderColor={"brown-4"}
        />

        <Span color="dark-sand">
          Scan QR code with your google Authenticator App or enter the secret key manually.
        </Span>

        <Div
          gap={12}
          mt={16}
          column
          color="white"
        >
          <Span color="dark-sand">Your secret key:</Span>
          <Button
            kind="secondary"
            label={downloaded ? "Saved!" : "Save Backup Key"}
            loading={form.loading}
            fx
            onClick={downloadBackup}
          />
        </Div>

        <Span
          color="dark-sand"
          mt={12}
        >
          Write down the code and don’t let anyone see it!
        </Span>

        <Divider
          as={"div"}
          px={16}
          my={16}
          borderColor={"brown-4"}
        />

        <Div
          gap={12}
          column
        >
          <Span color="dark-sand">Verification Code</Span>
          <Input
            type="text"
            placeholder="Enter Verification code from Google Auth"
            maxLength={6}
            disabled={form.loading}
            error={form.errors.tfac}
            value={form.values.tfac}
            onChange={(x) => form.setValue("tfac", x)}
          />
        </Div>

        <Div
          mt={14}
          gap={12}
          column
        >
          <Button
            kind="primary-yellow"
            type="submit"
            label="Enable 2FA"
            size="md"
            onClick={handleTwoFactorState}
            loading={form.loading}
            disabled={!downloaded}
            fx
          />
        </Div>
      </Form>
    </Div>
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
