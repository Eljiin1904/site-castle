import { Button } from "@client/comps/button/Button";
import { Div } from "@client/comps/div/Div";
import { Modal } from "@client/comps/modal/Modal";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Dialogs } from "@client/services/dialogs";
import { useIsMobileLayout } from "#app/hooks/style/useIsMobileLayout";
import { useTranslation } from "@core/services/internationalization/internationalization";
import { useForm } from "@client/comps/form/useForm";
import { Validation } from "@core/services/validation";
import { Toasts } from "@client/services/toasts";
import { Form } from "@client/comps/form/Form";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { Input } from "@client/comps/input/Input";
import { ModalField } from "@client/comps/modal/ModalField";
import config from "#app/config";

export const AffiliateNewCampaignModal = () => {
  
  const {t} = useTranslation(["referrals"]);
  const small = useIsMobileLayout();
  
  const form = useForm({
    schema: Validation.object({
      campaignName: Validation.string()
      .max(256,t("validations.string.max",{value: {label:t("campaigns.campaignName"),max:256}}))
      .required(t("validations.mixed.required")),
      campaignCode: Validation.string()
      .max(16,t("validations.string.max",{value: {label:t("campaigns.campaignCode"),max:16}}))
      .required(t("validations.mixed.required")),
    }),
    onSubmit: async (values) => {
     // await Users.confirmEmail(values);
      Toasts.success("referrals:campaign.creationConfirmed");
      Dialogs.close("primary");
    },
  });
  
  return (
    <Modal
      width={small ? "sm" : "md"}
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading={t("campaigns.modalTitle")}
        onCloseClick={() => Dialogs.close("primary")}
      />      
      <ModalBody pt={0}>
        <Form form={form}>
          <ModalSection>            
            <ModalLabel>{t("campaigns.campaignName")}</ModalLabel>
            <Input
              type="text"
              placeholder={t("campaigns.campaignNamePlaceholder")}
              disabled={form.loading}
              error={
                form.errors.campaignName?.key
                  ? t("validations:"+form.errors.campaignName.key, { value: t("campaigns.campaignName") })
                  : undefined
              }
              value={form.values.campaignName}
              onChange={(x) =>form.setValue("campaignName",x)}
            />
          </ModalSection>
          <ModalSection>            
            <ModalLabel>{t("campaigns.campaignCode")}</ModalLabel>
            <Input
              type="text"
              placeholder={t("campaigns.campaignCodePlaceholder")}
              disabled={form.loading}
              error={
                form.errors.campaignCode?.key
                  ? t("validations:"+form.errors.campaignCode.key, { value: t("campaigns.campaignCode") })
                  : undefined
              }
              value={form.values.campaignCode}
              onChange={(x) =>form.setValue("campaignCode",x)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t("campaigns.campaignLink")}</ModalLabel>
            <ModalField bg="brown-4" color="light-sand">
              {config.siteURL}/{form.values.campaignCode}
            </ModalField>
          </ModalSection>
          <Div
            fx
            column
            gap={12}
          >
            <Button
              type="submit"
              kind="primary-yellow"
              label={t("campaigns.modalTitle")}
              fx
              loading={form.loading}
            />            
          </Div>
        </Form>
      </ModalBody>
    </Modal>
  );
};
