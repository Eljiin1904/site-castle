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
    .required({
      key: "validations.file.required",
      value: name,
    })
    .test("fileType", {
      key: "validations.file.fileType",
      value: { type: "jpg" },
    }, (x) => {
      return x.file.type === "image/jpeg";
    })
    .test("fileSize", {
      key: "validations.file.fileSize",
      value: { size: 2 },
    }, (x) => {
      return x.file.size < 2 * 1024 * 1024;
    })
    .test("imageSize", {
      key: "validations.file.imageSize",
      value: { width: 256, height: 256 },
    }, (x) => {
      return x.image.width >= 256 && x.image.height >= 256;
    })
    .test("cropArea", {
      key: "validations.file.cropArea"
    }, (x) => {
      return x.cropArea !== undefined;
    });
};
