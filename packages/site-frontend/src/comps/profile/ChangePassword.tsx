import { Button } from "@client/comps/button/Button";
import { Validation } from "@core/services/validation";
import { Div } from "@client/comps/div/Div";
import { Input } from "@client/comps/input/Input";
import { Span } from "@client/comps/span/Span";
import { CaptchaForm } from "#app/comps/captcha-form/CaptchaForm";
import { useCaptchaForm } from "#app/comps/captcha-form/useCaptchaForm";
import { Users } from "#app/services/users";
import { Toasts } from "@client/services/toasts";

export const ChangePassword = () => {
  const form = useCaptchaForm({
    schema: Validation.object({
      currentPassword: Validation.password("Current password"),
      newPassword: Validation.password("New Password"),
    }),
    onSubmit: async (values) => {
      try {
        await Users.editPassword(values);
        Toasts.success("Password changed.");
      } catch (err) {
        Toasts.error("Unable to changed Password");
        throw err;
      }
    },
  });

  return (
    <Div
      column
      gap={24}
      width={"full"}
    >
      <CaptchaForm form={form}>
        <Span
          textTransform="uppercase"
          color="white"
          fontSize={24}
        >
          Change Password
        </Span>
        <Div
          gap={8}
          column
        >
          <Span color="dark-sand">Old Password</Span>
          <Input
            type="password"
            placeholder="Enter Old Password"
            autoComplete="current-password"
            disabled={form.loading}
            error={form.errors.currentPassword}
            value={form.values.currentPassword}
            onChange={(x) => form.setValue("currentPassword", x)}
          />
        </Div>
        <Div
          gap={8}
          column
        >
          <Span color="dark-sand">New Password</Span>
          <Input
            type="password"
            placeholder="Enter New Password"
            autoComplete="new-password"
            disabled={form.loading}
            error={form.errors.newPassword}
            value={form.values.newPassword}
            onChange={(x) => form.setValue("newPassword", x)}
          />
        </Div>

        <Button
          type="submit"
          kind="primary-yellow"
          label="Save Changes"
          size="md"
          // fx
          loading={form.loading}
        />
      </CaptchaForm>
    </Div>
  );
};
