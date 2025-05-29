export function convertPathToWebp(imgPath: string) {
  const extAr = [".jpg", ".jpeg", ".png"];
  let webpPath: string = extAr.reduce((prev, cur) => prev.replace(cur, ".webp"), imgPath);

  return webpPath;
}
