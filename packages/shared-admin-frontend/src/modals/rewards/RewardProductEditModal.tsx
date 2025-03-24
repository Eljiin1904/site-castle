import { Validation } from "@core/services/validation";
import { RewardProductDocument } from "@core/types/rewards/RewardProductDocument";
import { Form } from "@client/comps/form/Form";
import { Input } from "@client/comps/input/Input";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { ModalSection } from "@client/comps/modal/ModalSection";
import { Button } from "@client/comps/button/Button";
import { useForm } from "@client/comps/form/useForm";
import { ModalLabel } from "@client/comps/modal/ModalLabel";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { Checkbox } from "@client/comps/checkbox/Checkbox";
import { SvgGem } from "@client/svgs/common/SvgGem";
import { ModalField } from "@client/comps/modal/ModalField";
import { Tokens } from "@client/comps/tokens/Tokens";
import { Rewards } from "#app/services/rewards";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const RewardProductEditModal = ({
  product,
  onSuccess,
}: {
  product: RewardProductDocument;
  onSuccess: () => void;
}) => {
  const { t } = useTranslation(["validations"]);

  const form = useForm({
    schema: Validation.object({
      image: Validation.imageConditional(512, 512),
      displayName: Validation.string().required("Display name is required."),
      gemCost: Validation.currency("Gem cost"),
      disabled: Validation.boolean().required(),
      featured: Validation.boolean().required(),
    }),
    initialValues: {
      displayName: product.displayName,
      gemCost: product.gemCost,
      disabled: product.disabled,
      featured: product.featured,
    },
    onSubmit: async ({ image, ...values }) => {
      await Rewards.editProduct({
        ...values,
        image: image?.file,
        productId: product._id,
      });
      onSuccess();
      Toasts.success("Reward product updated.");
      Dialogs.close("primary");
    },
  });

  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Update Product"
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody overflow={undefined}>
        <Form form={form}>
          <ModalSection align="flex-start">
            <ModalLabel>{"Image"}</ModalLabel>
            <Input
              type="image"
              accept=".png"
              width="150px"
              height="150px"
              placeholder={{
                type: "png",
                path: `/reward-products/${product.imageId}`,
              }}
              error={
                form.errors.image?.key
                  ? t(form.errors.image.key, { value: form.errors.image.value })
                  : undefined
              }
              value={form.values.image}
              onChange={(x) => form.setValue("image", x)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Display Name"}</ModalLabel>
            <Input
              type="text"
              placeholder="Enter display name..."
              disabled={form.loading}
              error={
                form.errors.displayName?.key
                  ? t(form.errors.displayName.key, { value: form.errors.displayName.value })
                  : undefined
              }
              value={form.values.displayName}
              onChange={(x) => form.setValue("displayName", x)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Gem Cost"}</ModalLabel>
            <Input
              type="currency"
              decimals={0}
              placeholder="Enter gem cost..."
              iconLeft={SvgGem}
              disabled={form.loading}
              error={
                form.errors.gemCost?.key
                  ? t(form.errors.gemCost.key, { value: form.errors.gemCost.value })
                  : undefined
              }
              value={form.values.gemCost}
              onChange={(x) => form.setValue("gemCost", x)}
            />
          </ModalSection>
          {product.kind === "case" && (
            <ModalSection>
              <ModalLabel>{"Chest ID"}</ModalLabel>
              <ModalField>{product.chest.id}</ModalField>
            </ModalSection>
          )}
          {product.kind === "tokens" && (
            <ModalSection>
              <ModalLabel>{"Token Amount"}</ModalLabel>
              <ModalField>
                <Tokens value={product.tokenAmount} />
              </ModalField>
            </ModalSection>
          )}
          <ModalSection>
            <ModalLabel>{"Status"}</ModalLabel>
            <Checkbox
              label="Enabled"
              disabled={form.loading}
              value={!form.values.disabled}
              onChange={(x) => form.setValue("disabled", !x)}
            />
          </ModalSection>
          <ModalSection>
            <ModalLabel>{"Feature"}</ModalLabel>
            <Checkbox
              label="Featured"
              disabled={form.loading}
              value={form.values.featured}
              onChange={(x) => form.setValue("featured", x)}
            />
          </ModalSection>
          <Button
            type="submit"
            kind="primary"
            label="Update Product"
            fx
            loading={form.loading}
          />
        </Form>
      </ModalBody>
    </Modal>
  );
};
