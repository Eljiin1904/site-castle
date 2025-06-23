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
import { Affiliates } from "#app/services/affiliates";
import config from "#app/config";
import { CampaignIdField } from "#app/comps/campaign-id-field/CampaignIdField";

/**
 * Modal Form to create a new campaign, form fields are:
 * - campaignName: string
 * - campaignId: string
 * * Campaign Name must be between 5 and 64 characters long
 * and is required.
 * Campaign ID must be unique and can only contain alphanumeric characters
 * and must be between 5 and 16 characters long.
 * Campaign ID is checked against the database to ensure it is unique.
 * @returns Modal to create a new campaign
 */
export const AffiliateNewCampaignModal = () => {
  
  const {t} = useTranslation(["referrals"]);
  const small = useIsMobileLayout();
  
  const form = useForm({
    schema: Validation.object({
      campaignName: Validation.string()
      .max(64)
      .min(5)
      .required().label(t("campaigns.campaignName")),
      campaignId: Validation.string()
      .max(25)
      .min(5)
      .matches(/^[a-z0-9]+$/i)
      .required().label(t("campaigns.campaignCode")),
    }),
    initialValues: {
      campaignName: "",
      campaignId: crypto.randomUUID().replaceAll("-", "").slice(0, 16),
    },
    onSubmit: async (values) => {
      await Affiliates.createCampaign(values)
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
        noBorder
      />      
      <ModalBody>
        <Form form={form}>
          <ModalSection>            
            <ModalLabel>{t("campaigns.campaignName")}</ModalLabel>
            <Input
              type="text"
              placeholder={t("campaigns.campaignNamePlaceholder")}
              disabled={form.loading}
              error={
                form.errors.campaignName?.key
                  ? t("validations:"+form.errors.campaignName.key, { value: form.errors.campaignName.value })
                  : undefined
              }
              value={form.values.campaignName}
              onChange={(x) =>form.setValue("campaignName",x)}
            />
          </ModalSection>
          <ModalSection>            
            <ModalLabel>{t("campaigns.campaignCode")}</ModalLabel>
            <CampaignIdField
              placeholder={t("campaigns.campaignCodePlaceholder")}
              disabled={form.loading}
              error={form.errors.campaignId?.key ? t("validations:"+form.errors.campaignId.key, { value: form.errors.campaignId.value }): undefined}
              value={form.values.campaignId}
              setError={(x) => form.setError("campaignId", { key: x || "" })}
              onChange={(x) => form.setValue("campaignId", x)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{t("campaigns.campaignLink")}</ModalLabel>
            <ModalField bg="brown-4" color="light-sand">
              {config.siteURL}/r/{form.values.campaignId}
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
