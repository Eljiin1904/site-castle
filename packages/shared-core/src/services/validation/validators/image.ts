import { mixed } from "yup";

export const image = (
  width: number,
  height: number,
  name: string = "Image",
) => {
  return mixed<{
    path: string;
    file: File;
    image: HTMLImageElement;
  }>()
    .required({
      key: "validations.mixed.required",
      value: name,
    })
    .test("fileType", {
      key: "validations.file.fileType",
      value: { type: "jpg or png" },
    }, (x) => {
      return x.file.type === "image/jpeg" || x.file.type === "image/png";
    })
    .test("fileSize", {
      key: "validations.file.fileSize",
      value: { size: 4 },
    }, (x) => {
      return x.file.size < 4 * 1024 * 1024;
    })
    .test("imageSize", {
      key: "validations.file.imageSize",
      value: { width: width, height: height },
    }, (x) => {
      return x.image.width === width && x.image.height === height;
    });
};

export const imageConditional = (
  width: number,
  height: number,
  name: string = "Image",
) => {
  return mixed<{
    path: string;
    file: File;
    image: HTMLImageElement;
  }>()
    .test("fileType",  {
      key: "validations.file.fileType",
      value: { type: "jpg or png" },
    }, (x) => {
      return !x || x.file.type === "image/jpeg" || x.file.type === "image/png";
    })
    .test("fileSize",  {
      key: "validations.file.fileSize",
      value: { size: 4 },
    }, (x) => {
      return !x || x.file.size < 4 * 1024 * 1024;
    })
    .test("imageSize", {
      key: "validations.file.imageSize",
      value: { width: width, height: height },
    }, (x) => {
      return !x || (x.image.width === width && x.image.height === height);
    })
    .when("imageRequired", {
      is: true,
      then: (schema) => schema.required({
        key: "validations.mixed.required",
        value: name
      }),
    });
};
