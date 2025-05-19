export function createParentElement() {
  const div = document.createElement("div");
  const { style } = div;
  style.position = "relative";
  style.flex = "0 1 auto";
  style.overflow = "hidden";
  style.display = "flex";
  style.minWidth = "0";
  style.minHeight = "0";
  return div;
}

export function createChildElement(bgImage: string) {
  const div = document.createElement("div");
  const { style } = div;
  style.position = "relative";
  style.flex = "0 0 auto";
  style.left = "50%";
  style.transform = "translateX(-50%)";

  const cssBackground = `url("${bgImage}")`;
  style.background = cssBackground;
  style.backgroundSize = "cover";

  return div;
}
