import { useNavigate } from "react-router-dom";
import { Validation } from "@core/services/validation";
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
import { Users } from "#app/services/users";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Div } from "@client/comps/div/Div";
import { SvgLock } from "#app/svgs/common/SvgLock";
import { Vector } from "@client/comps/vector/Vector";
import { Heading } from "@client/comps/heading/Heading";

export const UserResetPasswordModal = ({
  recoverToken,
}: {
  recoverToken: string;
}) => {
  
  const small = useIsMobileLayout();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {t} = useTranslation(["validations"]);
  const form = useForm({
    schema: Validation.object({
      newPassword: Validation.password(t("validations.password.field")),
      confirmPassword: Validation.confirmPassword()
        .oneOf([Validation.ref("newPassword")],'validations.password.repeated')
        .required(t("validations.password.required",{value:t("validations.password.confirmField")})),
    }),
    onSubmit: async (values) => {
      const { user } = await Users.resetPassword({ ...values, recoverToken });
      dispatch(Users.initUser({ authenticated: true, user }));
      Toasts.success(t("signin.success", { username: user.username }));
      navigate("/");
      Dialogs.close("primary");
    },
  });

  const justify = small ? "center" : "flex-start";

  return (
    <Modal
      className="LoginModal"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        onCloseClick={() => Dialogs.close("primary")}
      />
      <Div fy>
        <Div
          className={`login-content`}
          column
        >
          <ModalBody justifyContent={justify}>
            <Div
              column
              gap={16}
              flexCenter
              fx
            >
              <Div width={40} px={48} py={28} borderRadius={"full"} border borderColor="brown-4" borderWidth={1}>
                <Vector fx as={SvgLock} size={40}/>
              </Div>
              <Heading  as="h2"
                size={small ? 20 : 24}
                fontWeight="regular"
                textTransform="uppercase">{t("reset.title")}
              </Heading>
              <Form form={form}>
                <ModalSection>
                  <ModalLabel>{t("reset.form.password")}</ModalLabel>
                  <Input
                    type="password"
                    id="new-password"
                    placeholder={t("reset.form.passwordPlaceholder")}
                    autoComplete="new-password"
                    disabled={form.loading}
                    error={form.errors.newPassword?.key ? t(form.errors.newPassword.key, {value: form.errors.newPassword.value}) : undefined}
                    value={form.values.newPassword}
                    onChange={(x) => form.setValue("newPassword", x)}
                  />
                </ModalSection>
                <ModalSection>
                  <ModalLabel>{t("reset.form.confirm")}</ModalLabel>
                  <Input
                    type="password"
                    id="confirm-password"
                    autoComplete="new-password"
                    placeholder={t("reset.form.confirmPlaceholder")}
                    disabled={form.loading}
                    error={form.errors.confirmPassword?.key ? t(form.errors.confirmPassword.key, {value: form.errors.confirmPassword.value}) : undefined}
                    value={form.values.confirmPassword}
                    onChange={(x) => form.setValue("confirmPassword", x)}
                  />
                </ModalSection>
                <Button
                  type="submit"
                  kind="primary-yellow"
                  label={t("reset.form.submit")}
                  fx
                  loading={form.loading}
                  mt={4}
                />
              </Form>
            </Div>
          </ModalBody>
        </Div> 
      </Div>
    </Modal>
  );
};