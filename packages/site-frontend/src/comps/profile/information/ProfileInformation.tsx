import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Input } from "@client/comps/input/Input";
import { Span } from "@client/comps/span/Span";
import { useCaptchaForm } from "../../captcha-form/useCaptchaForm";
import { Validation } from "@core/services/validation";
import { Users } from "#app/services/users";
import { Toasts } from "@client/services/toasts";
import { CaptchaForm } from "../../captcha-form/CaptchaForm";
import { Divider } from "@client/comps/divider/Divider";
import { NoticeCard } from "@client/comps/cards/NoticeCard";
import { SecureTextInput } from "@client/comps/input/SecureTextInput";
import { useMount } from "@client/hooks/system/useMount";

export const ProfileInformation = () => {
  const currentEmail = useAppSelector((x) => x.user.email);
  const currentUsername = useAppSelector((x) => x.user.username);

  const form = useCaptchaForm({
    schema: Validation.object({
      email: Validation.email().notOneOf([currentEmail], "Cannot be current email."),
      password: Validation.password(),
    }),
    onSubmit: async (values) => {
      await Users.editEmail(values);
      Toasts.success("Email changed.");
    },
  });
  useMount(() => {
    form.setValue("email", currentEmail);
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
          Profile Information
        </Span>
        <Div
          gap={10}
          column
        >
          <Span
            color="dark-sand"
            fontSize={14}
          >
            Username
          </Span>
          <Span
            color="white"
            size={20}
          >
            {currentUsername}
          </Span>
        </Div>
        <Divider
          as={"div"}
          px={16}
          mt={5}
          borderColor={"brown-4"}
        />
        <Div
          gap={8}
          column
        >
          <Span color="dark-sand">Email</Span>
          <SecureTextInput
            autoComplete="email"
            placeholder="Email"
            disabled={form.loading}
            error={form.errors.email}
            value={form.values.email}
            onChange={(x) => form.setValue("email", x)}
          />
        </Div>
        <Div
          gap={8}
          column
        >
          <Span color="dark-sand">Password</Span>
          <Input
            type="password"
            id="current-password"
            autoComplete="current-password"
            placeholder="Enter current password..."
            disabled={form.loading}
            error={form.errors.password}
            value={form.values.password}
            onChange={(x) => form.setValue("password", x)}
          />
        </Div>
        <NoticeCard
          kind="warning"
          message="The user will have to re-confirm their email."
        />
        <Div>
          <Button
            kind="primary-yellow"
            type="submit"
            label="Save Changes"
            loading={form.loading}
            size="md"
          />
        </Div>
      </CaptchaForm>
    </Div>
  );
};
