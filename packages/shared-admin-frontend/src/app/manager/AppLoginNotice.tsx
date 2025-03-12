import { Validation } from "@core/services/validation";
import { useForm } from "@client/comps/form/useForm";
import { Form } from "@client/comps/form/Form";
import { Div } from "@client/comps/div/Div";
import { Input } from "@client/comps/input/Input";
import { Main } from "@client/comps/main/Main";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Button } from "@client/comps/button/Button";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { SiteLogo } from "#app/comps/site-logo/SiteLogo";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Admin } from "#app/services/admin";
import { Security } from "#app/services/security";

export const AppLoginNotice = () => {
  return (
    <Main
      fx
      fy
      center
      bg="brown-7"
    >
      <Div
        column
        fx
        pb={32}
        style={{ maxWidth: "400px" }}
      >
        <Div
          fx
          center
          mb={48}
        >
          <SiteLogo />
        </Div>
        <LoginForm />
      </Div>
    </Main>
  );
};

const LoginForm = () => {
  const dispatch = useAppDispatch();

  const form = useForm({
    schema: Validation.object({
      username: Validation.email(),
      password: Validation.password(),
    }),
    onSubmit: async (values) => {
      const { user } = await Security.authLocal(values);
      dispatch(Admin.initAdmin({ authenticated: true, user }));
    },
  });

  return (
    <Form form={form}>
      <ModalSection>
        <ModalLabel>{"Email"}</ModalLabel>
        <Input
          type="email"
          id="email"
          autoComplete="email"
          placeholder="Enter email..."
          disabled={form.loading}
          error={form.errors.username}
          value={form.values.username}
          onChange={(x) => form.setValue("username", x)}
        />
      </ModalSection>
      <ModalSection>
        <ModalLabel>{"Password"}</ModalLabel>
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          placeholder="Enter password..."
          disabled={form.loading}
          error={form.errors.password}
          value={form.values.password}
          onChange={(x) => form.setValue("password", x)}
        />
      </ModalSection>
      <Button
        type="submit"
        kind="primary"
        label="Login"
        fx
        loading={form.loading}
      />
    </Form>
  );
};
