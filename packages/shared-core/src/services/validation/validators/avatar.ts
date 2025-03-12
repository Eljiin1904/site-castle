import { mixed } from "yup";

export const avatar = (name: string = "Avatar") => {
  return mixed<{
    path: string;
    file: File;
    image: HTMLImageElement;
    cropArea: {
      width: number;
      height: number;
      x: number;
      y: number;
    };
  }>()
    .required(`${name} is required.`)
    .test("fileType", "File type must be jpeg.", (x) => {
      return x.file.type === "image/jpeg";
    })
    .test("fileSize", "File size must be less than 2MB.", (x) => {
      return x.file.size < 2 * 1024 * 1024;
    })
    .test("imageSize", "Image size must be at least 256x256.", (x) => {
      return x.image.width >= 256 && x.image.height >= 256;
    })
    .test("cropArea", "Invalid crop result.", (x) => {
      return x.cropArea !== undefined;
    });
};
