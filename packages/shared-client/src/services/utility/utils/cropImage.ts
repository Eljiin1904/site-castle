type Area = {
  width: number;
  height: number;
  x: number;
  y: number;
};

export async function cropImage({
  image,
  cropArea,
}: {
  image: HTMLImageElement;
  cropArea: Area;
}) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Failed to create canvas context.");
  }

  const maxSize = Math.max(image.width, image.height);
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

  canvas.width = safeArea;
  canvas.height = safeArea;

  ctx.translate(safeArea / 2, safeArea / 2);
  ctx.translate(-safeArea / 2, -safeArea / 2);

  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5,
  );
  const data = ctx.getImageData(0, 0, safeArea, safeArea);

  canvas.width = cropArea.width;
  canvas.height = cropArea.height;

  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - cropArea.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - cropArea.y),
  );

  const file = await new Promise<File>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(new File([blob], "blob", { type: "image/jpeg" }));
      } else {
        reject(new Error("Failed to convert canvas to blob."));
      }
    }, "image/jpeg");
  });

  return file;
}
