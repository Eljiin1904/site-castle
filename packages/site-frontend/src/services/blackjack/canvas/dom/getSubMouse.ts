export function getSubMousePos(canvas: HTMLElement, event: MouseEvent) {
  // accomodates canvas pixel ratio
  var rect = canvas.getBoundingClientRect();
  return {
    // @ts-ignore
    x: ((event.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
    // @ts-ignore
    y: ((event.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
  };
}
