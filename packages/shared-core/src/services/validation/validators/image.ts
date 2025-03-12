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
    .required(`${name} is required.`)
    .test("fileType", "File type must be jpg or png.", (x) => {
      return x.file.type === "image/jpeg" || x.file.type === "image/png";
    })
    .test("fileSize", "File size must be less than 4MB.", (x) => {
      return x.file.size < 4 * 1024 * 1024;
    })
    .test("imageSize", `Image size must be ${width}x${height}.`, (x) => {
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
    .test("fileType", "File type must be jpg or png.", (x) => {
      return !x || x.file.type === "image/jpeg" || x.file.type === "image/png";
    })
    .test("fileSize", "File size must be less than 4MB.", (x) => {
      return !x || x.file.size < 4 * 1024 * 1024;
    })
    .test("imageSize", `Image size must be ${width}x${height}.`, (x) => {
      return !x || (x.image.width === width && x.image.height === height);
    })
    .when("imageRequired", {
      is: true,
      then: (schema) => schema.required(`${name} is required.`),
    });
};
