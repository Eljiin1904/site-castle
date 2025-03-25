import { Validation } from "@core/services/validation";
import { Strings } from "@core/services/strings";
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
import { Dropdown } from "@client/comps/dropdown/Dropdown";
import { SvgGem } from "@client/svgs/common/SvgGem";
import { Rewards } from "#app/services/rewards";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const RewardProductCreateModal = ({ onSuccess }: { onSuccess: () => void }) => {
  const { t } = useTranslation(["validations"]);

  const form = useForm({
    schema: Validation.object({
      image: Validation.image(512, 512),
      kindIndex: Validation.number().required(),
      displayName: Validation.string().required("Display name is required."),
      gemCost: Validation.currency("Gem cost"),
      tokenAmount: Validation.currency("Token amount").optional(),
      chestId: Validation.string(),
    }),
    initialValues: {
      kindIndex: 0,
    },
    onSubmit: async ({ kindIndex, image, ...values }) => {
      await Rewards.createProduct({
        ...values,
        image: image?.file,
        kind: Rewards.productKinds[kindIndex],
      });
      onSuccess();
      Toasts.success("Reward product created.");
      Dialogs.close("primary");
    },
  });

  const kind = Rewards.productKinds[form.values.kindIndex || 0];

  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Create Product"
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
                path: "/icons/unknown",
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
            <ModalLabel>{"Product"}</ModalLabel>
            <Dropdown
              type="select"
              fx
              options={Rewards.productKinds.map((x) => Strings.kebabToTitle(x))}
              disabled={form.loading}
              value={form.values.kindIndex || 0}
              onChange={(x, i) => form.setValue("kindIndex", i)}
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
          {kind === "case" && (
            <ModalSection>
              <ModalLabel>{"Chest ID"}</ModalLabel>
              <Input
                type="text"
                placeholder="Enter chest id..."
                disabled={form.loading}
                error={
                  form.errors.chestId?.key
                    ? t(form.errors.chestId.key, { value: form.errors.chestId.value })
                    : undefined
                }
                value={form.values.chestId}
                onChange={(x) => form.setValue("chestId", x?.replace(/[^a-z0-9]/gi, ""))}
              />
            </ModalSection>
          )}
          {kind === "tokens" && (
            <ModalSection>
              <ModalLabel>{"Token Amount"}</ModalLabel>
              <Input
                type="currency"
                placeholder="Enter token amount..."
                disabled={form.loading}
                error={
                  form.errors.tokenAmount?.key
                    ? t(form.errors.tokenAmount.key, { value: form.errors.tokenAmount.value })
                    : undefined
                }
                value={form.values.tokenAmount}
                onChange={(x) => form.setValue("tokenAmount", x)}
              />
            </ModalSection>
          )}
          <Button
            type="submit"
            kind="primary"
            label="Create Product"
            fx
            loading={form.loading}
          />
        </Form>
      </ModalBody>
    </Modal>
  );
};
