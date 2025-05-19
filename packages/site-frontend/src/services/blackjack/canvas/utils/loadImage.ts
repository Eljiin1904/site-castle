export function loadImage(src: string) {
  const img = new Image();
  img.src = src;
  return new Promise<HTMLImageElement>((resolve, reject) => {
    img.onload = () => resolve(img);

    // breaking process on bad image
    img.onerror = () => reject(new Error("Failed to load image " + src));
  });
}
