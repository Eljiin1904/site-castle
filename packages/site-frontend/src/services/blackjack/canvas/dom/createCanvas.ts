export function createCanvas({ width, height }: { width: number; height: number }) {
  const canvas = document.createElement("canvas");
  // changing will modify resolution
  canvas.width = width;
  canvas.height = height;
  // canvas.style.width = `${width}px`;
  // canvas.style.height = `${height}px`;
  // canvas.style.width = `100%`;
  // canvas.style.height = `100%`;

  // prevent right click and text select
  canvas.oncontextmenu = function () {
    return false;
  };
  canvas.onselectstart = function () {
    return false;
  };

  return canvas;
}
