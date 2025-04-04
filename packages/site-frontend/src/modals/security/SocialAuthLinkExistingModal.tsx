import { useEffect, useState } from "react";
import { Validation } from "@core/services/validation";
import { UserLinkProvider } from "@core/types/users/UserLinkProvider";
import { Button } from "@client/comps/button/Button";
import { Form } from "@client/comps/form/Form";
import { useForm } from "@client/comps/form/useForm";
import { Input } from "@client/comps/input/Input";
import { Modal } from "@client/comps/modal/Modal";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { useAppDispatch } from "#app/hooks/store/useAppDispatch";
import { Security } from "#app/services/security";
import { Users } from "#app/services/users";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Heading } from "@client/comps/heading/Heading";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { SvgUser } from "@client/svgs/common/SvgUser";
import { useAppSelector } from "#app/hooks/store/useAppSelector";

export const SocialAuthLinkExistingModal = ({
  provider,
  userId,
  providerId,
}: {
  provider: UserLinkProvider;
  userId: string;
  providerId: string;
}) => {
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const [, setUserCreated] = useState(false);
  const dispatch = useAppDispatch();
  const small = useIsMobileLayout();
  const { t } = useTranslation();

  useEffect(() => {
    if (authenticated) {
      setUserCreated(true);
    }
  }, [authenticated]);

  const handleCancel = () => {
    Dialogs.close("primary");
  };

  const form = useForm({
    schema: Validation.object({
      password: Validation.password(t("validations:validations.password.field")),
    }),
    onSubmit: async (values) => {
      try {
        const res = await Security.linkAccount({
          ...values,
          provider,
          userId,
          providerId,
        });

        if (res.action === "password-wrong") {
          Toasts.error(new Error("link.linkFailure"));
          Dialogs.close("primary");
          return;
        }

        dispatch(Users.initUser({ authenticated: true, user: res.user }));
        Toasts.success("signin.success", 5000, { username: res.user.username });
        Dialogs.close("primary");
      } catch (err) {
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
      <ModalBody
        textAlign="center"
        justifyContent={small ? "center" : "flex-start"}
      >
        <Div
          width={40}
          px={48}
          py={20}
          borderRadius={"full"}
          border
          borderColor="brown-4"
          borderWidth={1}
        >
          <Vector
            fx
            as={SvgUser}
            size={40}
          />
        </Div>
        <Heading
          as="h2"
          size={small ? 20 : 24}
          fontWeight="regular"
          textTransform="uppercase"
        >
          {t("link.linkTitle")}
        </Heading>
        <Form form={form}>
          <ModalSection>
            <ModalLabel>{t("link.linkDescription")}</ModalLabel>
            <Input
              type="password"
              id="new-password"
              autoComplete="new-password"
              placeholder={t("register.form.passwordPlaceholder")}
              disabled={form.loading}
              error={
                form.errors.password?.key
                  ? t(`validations:${form.errors.password.key}`, {
                      value: form.errors.password.value,
                    })
                  : undefined
              }
              value={form.values.password}
              onChange={(x) => form.setValue("password", x)}
            />
          </ModalSection>
          <Div>
            <Button
              fx
              kind="secondary-yellow"
              label={t("common:cancel")}
              onClick={handleCancel}
            />
            <Button
              type="submit"
              kind="primary-yellow"
              label={t("link.linkSubmit")}
              fx
              loading={form.loading}
            />
          </Div>
        </Form>
      </ModalBody>
    </Modal>
  );
};
