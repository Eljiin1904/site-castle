import { Utility } from "@client/services/utility";
import { Http } from "@client/services/http";

export async function editAvatar({
  avatar,
  captchaToken,
}: {
  avatar: {
    path: string;
    file: File;
    image: HTMLImageElement;
    cropArea: {
      width: number;
      height: number;
      x: number;
      y: number;
    };
  };
  captchaToken: string;
}) {
  const file = await Utility.cropImage(avatar);

  const data = new FormData();
  data.append("image", file);
  data.append("captchaToken", captchaToken);

  return await Http.post("/users/edit-avatar", data);
}
