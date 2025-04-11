import { Validation } from "@core/services/validation";
import { Button } from "@client/comps/button/Button";
import {
  ImageCropper,
  ImageCropperValue,
} from "@client/comps/image-cropper/ImageCropper";
import { ImageInputValue } from "@client/comps/input/ImageInput";
import { Input } from "@client/comps/input/Input";
import { Modal } from "@client/comps/modal/Modal";
import { ModalHeader } from "@client/comps/modal/ModalHeader";
import { Dialogs } from "@client/services/dialogs";
import { Toasts } from "@client/services/toasts";
import { ModalBody } from "@client/comps/modal/ModalBody";
import { Div } from "@client/comps/div/Div";
import { CaptchaForm } from "#app/comps/captcha-form/CaptchaForm";
import { useCaptchaForm } from "#app/comps/captcha-form/useCaptchaForm";
import { useAppSelector } from "#app/hooks/store/useAppSelector";
import { Users } from "#app/services/users";
import { useTranslation } from "@core/services/internationalization/internationalization";

export const UserAvatarEditModal = () => {
  const imageId = useAppSelector((x) => x.user.avatarId);
  const avatarIndex = useAppSelector((x) => x.user.avatarIndex);
  const {t} = useTranslation(["account","validations"]);
  const form = useCaptchaForm({
    schema: Validation.object({
      image: Validation.mixed<ImageInputValue>().required("avatar.required"),
      crop: Validation.mixed<ImageCropperValue>().required("avatar.cropArea"),
    }),
    onSubmit: async ({ image, crop, captchaToken }) => {
      const avatar = { ...image, ...crop };

      await Users.editAvatar({ avatar, captchaToken });

      Toasts.success(t("avatar.success"));
      Dialogs.close("primary");
    },
  });

  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading={t("avatar.title")}
        onCloseClick={() => Dialogs.close("primary")}
      />
      <ModalBody>
        <CaptchaForm form={form}>
          {form.values.image ? (
            <ImageCropper
              height="256px"
              aspect={1}
              image={form.values.image.image}
              value={form.values.crop}
              onChange={(x) => form.setValue("crop", x)}
            />
          ) : (
            <Input
              type="image"
              accept=".jpg, .jpeg"
              width="256px"
              height="256px"
              placeholder={{
                type: "jpg",
                path: imageId
                  ? `/avatars/${imageId}`
                  : `/avatars-default/${avatarIndex.toString().padStart(3, "0")}`,
              }}
              error={form.errors.image?.key
                ? t(form.errors.image.key, { value: form.errors.image.value })
                : undefined}
              value={form.values.image}
              onChange={(x) => {
                if (x.file) {
                  if (x.file.type !== "image/jpeg") {
                    form.setError("image", {key: "avatar.fileType", value: x.file.type});
                  } else if (x.file.size > 2 * 1024 * 1024) {
                    form.setError("image", {key: "avatar.fileSize", value:"2"});
                  } else if (x.image.width < 256 || x.image.height < 256) {
                    form.setError(
                      "image",
                      {key: "avatar.fileSize", value:"256x256"}
                    );
                  } else {
                    form.setError("image", undefined);
                    form.setValue("image", x);
                  }
                } else {
                  form.setValue("image", x);
                }
              }}
            />
          )}
          <Div
            fx
            column
            gap={12}
          >
            {form.values.image && (
              <Button
                kind="secondary-yellow"
                label={t("common:back")}
                fx
                onClick={() => form.setValue("image", undefined)}
              />
            )}
            <Button
              type="submit"
              kind="primary-yellow"
              label={t("common:submit")}
              fx
              loading={form.loading}
            />
          </Div>
        </CaptchaForm>
      </ModalBody>
    </Modal>
  );
};
