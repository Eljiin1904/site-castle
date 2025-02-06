import { useState } from "react";
import { Validation } from "@core/services/validation";
import { UserLinkProvider } from "@core/types/users/UserLinkProvider";
import { Button } from "@client/comps/button/Button";
import { Form } from "@client/comps/form/Form";
import { useForm } from "@client/comps/form/useForm";
import { Input } from "@client/comps/input/Input";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { useReferralCode } from "#app/hooks/users/useReferralCode";
import { Security } from "#app/services/security";
import { Users } from "#app/services/users";
import { Gtm } from "#app/services/gtm";
import { UsernameField } from "#app/comps/username-field/UsernameField";

export const SocialAuthRegisterModal = ({
  provider,
  emailRequired,
  linkToken,
}: {
  provider: UserLinkProvider;
  emailRequired: boolean;
  linkToken: string;
}) => {
  const [initReferralCode, , removeReferralCode] = useReferralCode();
  const [showReferralCode, setShowReferralCode] = useState(!initReferralCode);
  const dispatch = useAppDispatch();

  const form = useForm({
    schema: Validation.object({
      emailRequired: Validation.boolean(),
      username: Validation.username(),
      email: Validation.emailConditional(),
      password: Validation.password(),
      referralCode: Validation.string(),
    }),
    initialValues: {
      emailRequired,
      referralCode: initReferralCode,
    },
    onSubmit: async (values) => {
      try {
        const { user } = await Security.registerSocial({
          ...values,
          provider,
          linkToken,
        });

        dispatch(Users.initUser({ authenticated: true, user }));

        Gtm.trackRegister({ user, strategy: provider });

        Toasts.success(`Welcome, ${user.username}!`);

        Dialogs.close("primary");
      } catch (err) {
        if (
          !showReferralCode &&
          err instanceof Error &&
          err.message.startsWith("Invalid referral code.")
        ) {
          removeReferralCode();
          setShowReferralCode(true);
        }
        throw err;
      }
    },
  });

  return (
    <Modal
      className="AuthRegisterModal"
      width="sm"
      disableBackdrop
    >
      <ModalHeader
        heading="Create Account"
        hideClose
      />
      <ModalBody>
        <Form form={form}>
          <ModalSection>
            <ModalLabel>{"Username"}</ModalLabel>
            <UsernameField
              placeholder="Enter username..."
              disabled={form.loading}
              error={form.errors.username}
              value={form.values.username}
              setError={(x) => form.setError("username", x)}
              onChange={(x) => form.setValue("username", x)}
            />
          </ModalSection>
          {emailRequired && (
            <ModalSection>
              <ModalLabel>{"Email"}</ModalLabel>
              <Input
                type="email"
                id="new-email"
                autoComplete="email"
                placeholder="Enter email..."
                disabled={form.loading}
                error={form.errors.email}
                value={form.values.email}
                onChange={(x) => form.setValue("email", x)}
              />
            </ModalSection>
          )}
          <ModalSection>
            <ModalLabel>{"Password"}</ModalLabel>
            <Input
              type="password"
              id="new-password"
              autoComplete="new-password"
              placeholder="Enter password..."
              disabled={form.loading}
              error={form.errors.password}
              value={form.values.password}
              onChange={(x) => form.setValue("password", x)}
            />
          </ModalSection>
          {showReferralCode && (
            <ModalSection>
              <ModalLabel>{"Referral Code - Optional"}</ModalLabel>
              <Input
                type="text"
                placeholder="Enter referral code..."
                maxLength={Users.nameMaxLength}
                disabled={form.loading}
                error={form.errors.referralCode}
                value={form.values.referralCode}
                onChange={(x) =>
                  form.setValue("referralCode", x?.replace(/[^a-z0-9]/gi, ""))
                }
              />
            </ModalSection>
          )}
          <Button
            type="submit"
            kind="primary"
            label="Create Account"
            fx
            loading={form.loading}
          />
        </Form>
      </ModalBody>
    </Modal>
  );
};
