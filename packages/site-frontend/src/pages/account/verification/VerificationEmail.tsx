import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Users } from "#app/services/users";
import { SvgEmail } from "#app/svgs/common/SvgEmail";
import { SvgPlane } from "#app/svgs/common/SvgPlane";
import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Form } from "@client/comps/form/Form";
import { useForm } from "@client/comps/form/useForm";
import { Heading } from "@client/comps/heading/Heading";
import { Input } from "@client/comps/input/Input";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Span } from "@client/comps/span/Span";
import { Vector } from "@client/comps/vector/Vector";
import { Toasts } from "@client/services/toasts";
import { useTranslation, Trans } from "@core/services/internationalization/internationalization";
import { Validation } from "@core/services/validation";
import { Fragment, useState } from "react";

export const VerificationEmail = ({tier}:{
  tier: number
}) => {

  const layout = useAppSelector((x) => x.style.mainLayout);
  const [sent, setSent] = useState(false);
  const user = useAppSelector((x) => x.user);
  const email = user.email;

  if(tier !== 0) return;

  return (<Div
      fx
      gap={24}
      column
      alignItems="flex-start"
      width={400}
    >
    {!sent && <SentVerificationEmail setSent={setSent} email={email} />}
    {sent && <VerifyEmail email={email} />}
  </Div>)
};

const SentVerificationEmail = ({email, setSent}:{
  email: string;
  setSent: (sent: boolean) => void;
}) => {

  const {t} = useTranslation(["account"]);
  const handleSendLink = async () => {
    setSent(true);
    await Users.sendEmailLink();
  };

  return (<Fragment>
    <Vector border borderColor="brown-4" p={20} as={SvgEmail} width={40} height={40} />   
    <Heading as="h3" size={24} textTransform="uppercase" fontWeight="regular">{t('verification.header')}</Heading>
    <Span>
    { //@ts-ignore}
      <Trans
        i18nKey="account:verification.tiers.tier1.description"
        values={{email: email }}
        components={[
          <Span
            color="light-sand"
          >
            {email}
          </Span>,
        ]}
      />
    }
    </Span>    
    <Button
      kind={ "primary-yellow"}      
      label={t("verification.tiers.tier1.action")}
      onClick={handleSendLink}
    />    
  </Fragment>);
};

const VerifyEmail = ({email}: {
  email: string;
}) => {

  const {t} = useTranslation(["account"]);
  const form = useForm({
    schema: Validation.object({
      confirmToken: Validation.string().required("validations.code.required"),
    }),
    onSubmit: async (values) => {
      await Users.confirmEmail(values);
      Toasts.success("register.emailConfirmed");
    },
  });

  return (<Fragment>
      <Vector border borderColor="brown-4" p={20} as={SvgPlane} width={40} height={40} />
      <Heading as="h3" size={24} textTransform="uppercase" fontWeight="regular">{t('verification.tiers.tier1.codeSent')}</Heading>
      <Span>
        {//@ts-ignore}
        <Trans
            i18nKey="account:verification.tiers.tier1.codeSentDescription"
            values={{email: email }}
            t={t}
            components={[
              <Span
                color="light-sand"
              >
                {email}
              </Span>,
            ]}
          />
      }
      </Span>
      <Form form={form} alignItems="flex-start">
        <ModalSection>
          <ModalLabel>{t("fields:code.field")}</ModalLabel>
          <Input
            type="text"
            placeholder={t("fields:code.codePlaceholder")}
            disabled={form.loading}
            error={
              form.errors.confirmToken?.key
                ? t("validations:"+form.errors.confirmToken.key, { value: form.errors.confirmToken.value })
                : undefined
            }
            value={form.values.confirmToken}
            onChange={(x) =>
              form.setValue(
                "confirmToken",
                x?.replace(/[^a-z0-9]/gi, "").toUpperCase(),
              )
            }
          />
        </ModalSection>
        <Button
          type="submit"
          kind="primary-yellow"
          label={t("common:confirm")}
          loading={form.loading}
        />
      </Form>
  </Fragment>)
};