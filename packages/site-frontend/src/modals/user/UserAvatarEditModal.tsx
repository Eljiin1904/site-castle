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

export const UserAvatarEditModal = () => {
  const imageId = useAppSelector((x) => x.user.avatarId);
  const avatarIndex = useAppSelector((x) => x.user.avatarIndex);

  const form = useCaptchaForm({
    schema: Validation.object({
      image: Validation.mixed<ImageInputValue>().required("Image is required."),
      crop: Validation.mixed<ImageCropperValue>().required(
        "Invalid crop result.",
      ),
    }),
    onSubmit: async ({ image, crop, captchaToken }) => {
      const avatar = { ...image, ...crop };

      await Users.editAvatar({ avatar, captchaToken });

      Toasts.success("Avatar changed.");
      Dialogs.close("primary");
    },
  });

  return (
    <Modal
      width="sm"
      onBackdropClick={() => Dialogs.close("primary")}
    >
      <ModalHeader
        heading="Change Avatar"
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
              error={form.errors.image}
              value={form.values.image}
              onChange={(x) => {
                if (x.file) {
                  if (x.file.type !== "image/jpeg") {
                    form.setError("image", "File type must be jpeg.");
                  } else if (x.file.size > 2 * 1024 * 1024) {
                    form.setError("image", "File size must be less than 2MB.");
                  } else if (x.image.width < 256 || x.image.height < 256) {
                    form.setError(
                      "image",
                      "Image size must be at least 256x256.",
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
                kind="secondary"
                label="Back"
                fx
                onClick={() => form.setValue("image", undefined)}
              />
            )}
            <Button
              type="submit"
              kind="primary"
              label="Submit"
              fx
              loading={form.loading}
            />
          </Div>
        </CaptchaForm>
      </ModalBody>
    </Modal>
  );
};
