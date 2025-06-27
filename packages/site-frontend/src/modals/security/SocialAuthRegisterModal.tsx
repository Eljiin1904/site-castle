import { Fragment, useEffect, useState } from "react";
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
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { Heading } from "@client/comps/heading/Heading";
import { Div } from "@client/comps/div/Div";
import { Vector } from "@client/comps/vector/Vector";
import { SvgUser } from "@client/svgs/common/SvgUser";
import { Span } from "@client/comps/span/Span";
import { Img } from "@client/comps/img/Img";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { SocialAuthLinkExistingModal } from "./SocialAuthLinkExistingModal";

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
  const authenticated = useAppSelector((x) => x.user.authenticated);
  const [userCreated, setUserCreated] = useState(false);
  const dispatch = useAppDispatch();
  const small = useIsMobileLayout();
  const { t } = useTranslation(["validations"]);

  useEffect(() => {
    if (authenticated) {
      setUserCreated(true);
    }
  }, [authenticated]);

  const form = useForm({
    schema: Validation.object({
      emailRequired: Validation.boolean(),
      username: Validation.username(t("validations.username.field")),
      email: Validation.emailConditional(t("validations.email.field")),
      password: Validation.password(t("validations.password.field")),
      referralCode: Validation.string(),
    }),
    initialValues: {
      emailRequired,
      referralCode: initReferralCode,
    },
    onSubmit: async (values) => {
      try {
        const res = await Security.registerSocial({
          ...values,
          provider,
          linkToken,
        });

        if (res.action === "link-to-other-provider") {
          if (!res.userId || !res.providerId) {
            console.log("missing userId from service");
            return;
          }
          Dialogs.open(
            "primary",
            <SocialAuthLinkExistingModal
              provider={provider}
              userId={res.userId}
              providerId={res.providerId}
            />,
          );
        } else {
          dispatch(Users.initUser({ authenticated: true, user: res.user }));
          Gtm.trackRegister({ user: res.user, strategy: provider });
          Toasts.success("register.success", 5000, { username: res.user.username });
          setUserCreated(true);
        }
      } catch (err) {
        if (
          !showReferralCode &&
          err instanceof Error &&
          err.message.startsWith("errors.invalidReferralCode")
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
      {userCreated ? (
        <Fragment>
          <ModalHeader />
          <Img
            type="png"
            path={`/graphics/login-banner`}
            width="100%"
            height={small ? "450px" : "296px"}
          />
          <ModalBody>
            <Div
              fx
              flexCenter
              column
              gap={32}
            >
              <Heading
                as="h2"
                size={24}
                fontWeight="regular"
                textTransform="uppercase"
                textAlign="center"
              >
                {t("register.social.success.title")}
              </Heading>
              <Span textAlign="center">{t("register.social.success.description")}</Span>
              <Button
                fx
                kind="primary-yellow"
                label={t("register.social.success.action")}
                onClick={() => Dialogs.close("primary")}
              />
            </Div>
          </ModalBody>
        </Fragment>
      ) : (
        <ModalBody
          textAlign="center"
          justifyContent={small ? "center" : "flex-start"}
        >
          <Div
            width={40}
            px={48}
            py={28}
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
            {t("register.social.title")}
          </Heading>
          <Form form={form}>
            <ModalSection>
              <ModalLabel>{t("register.form.username")}</ModalLabel>
              <UsernameField
                placeholder={t("register.form.usernamePlaceholder")}
                disabled={form.loading}
                error={
                  form.errors.username?.key
                    ? t(`${form.errors.username.key}`, { value: form.errors.username.value })
                    : undefined
                }
                value={form.values.username}
                setError={(x) => form.setError("username", { key: x?.key || "", value: x?.value || "" })}
                onChange={(x) => form.setValue("username", x)}
              />
            </ModalSection>
            {emailRequired && (
              <ModalSection>
                <ModalLabel>{t("register.form.email")}</ModalLabel>
                <Input
                  type="email"
                  id="new-email"
                  autoComplete="email"
                  placeholder={t("register.form.emailPlaceholder")}
                  disabled={form.loading}
                  error={
                    form.errors.email?.key
                      ? t(`${form.errors.email.key}`, { value: form.errors.email.value })
                      : undefined
                  }
                  value={form.values.email}
                  onChange={(x) => form.setValue("email", x)}
                />
              </ModalSection>
            )}
            <ModalSection>
              <ModalLabel>{t("register.form.password")}</ModalLabel>
              <Input
                type="password"
                id="new-password"
                autoComplete="new-password"
                placeholder={t("register.form.passwordPlaceholder")}
                disabled={form.loading}
                error={
                  form.errors.password?.key
                    ? t(`${form.errors.password.key}`, { value: form.errors.password.value })
                    : undefined
                }
                value={form.values.password}
                onChange={(x) => form.setValue("password", x)}
              />
            </ModalSection>
            {showReferralCode && (
              <ModalSection>
                <ModalLabel>{t("register.form.referral")}</ModalLabel>
                <Input
                  type="text"
                  placeholder={t("register.form.referralPlaceholder")}
                  maxLength={Users.nameMaxLength}
                  disabled={form.loading}
                  error={
                    form.errors.referralCode?.key
                      ? t(`${form.errors.referralCode.key}`, {
                          value: form.errors.referralCode.value,
                        })
                      : undefined
                  }
                  value={form.values.referralCode}
                  onChange={(x) => form.setValue("referralCode", x?.replace(/[^a-z0-9]/gi, ""))}
                />
              </ModalSection>
            )}
            <Button
              type="submit"
              kind="primary-yellow"
              label={t("register.social.submit")}
              fx
              loading={form.loading}
            />
          </Form>
        </ModalBody>
      )}
    </Modal>
  );
};
