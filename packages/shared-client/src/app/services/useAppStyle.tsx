import { useMount } from "#client/hooks/system/useMount";
import { Style } from "#client/services/style";

/**
 * Custom function to convert hex to rgb
 * @param hex value
 * @returns rgb value
 */
const hex2rgb = (hex:string) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? result?.slice(1).join(",") : "0,0,0";
};

/**
 * custom hook to read all color variables and create css variables and classes for them
 * It read all color variables from colors.ts
 * For each color, it will generate an hex and rgb value. 
 * It will use the hex value to create classes for color, background-color and border-color
 * It will use the rgb value to generate backgrounds with opacity
 * once all variables and classes are generated, it will append them to the head of the document
 * @returns null
 */
export const useAppStyle = () => {
  useMount(() => {
    const elementId = "app-colors";
    let style = document.getElementById(elementId);

    if (!style) {
      style = document.createElement("style");
      style.id = elementId;
    }

    const variables = Object.keys(Style.colors)
      .map((key) => `--${key}-color: ${(Style.colors as any)[key]};\n
      --${key}-rgb-color: ${hex2rgb((Style.colors as any)[key])};`)
      .join("\n\t");

    const index = ":root {\n\t" + variables + "\n}";

    const classes = Object.keys(Style.colors)
      .map(
        (key) =>
          `._color-${key} { color: var(--${key}-color); }` +
          "\n" +
          `._bg-${key} { background-color: var(--${key}-color); }` +
          "\n" +
          `._border-color-${key} { border-color: var(--${key}-color); }`,
      )
      .join("\n\n");

    style.innerHTML = index + "\n\n" + classes;

    document.head.appendChild(style);
  });

  useMount(() => {
    const elementId = "app-units";
    let style = document.getElementById(elementId);

    if (!style) {
      style = document.createElement("style");
      style.id = elementId;
    }

    const classes = Style.units
      .map(
        (unit) =>
          `._w-${unit} { width: ${unit}px; }` +
          "\n" +
          `._h-${unit} { height: ${unit}px; }` +
          "\n" +
          `._ml-${unit} { margin-left: ${unit}px; }` +
          "\n" +
          `._mr-${unit} { margin-right: ${unit}px; }` +
          "\n" +
          `._mt-${unit} { margin-top: ${unit}px; } ` +
          "\n" +
          `._mb-${unit} { margin-bottom: ${unit}px; }` +
          "\n" +
          `._pl-${unit} { padding-left: ${unit}px; }` +
          "\n" +
          `._pr-${unit} { padding-right: ${unit}px; }` +
          "\n" +
          `._pt-${unit} { padding-top: ${unit}px; }` +
          "\n" +
          `._pb-${unit} { padding-bottom: ${unit}px; }` +
          "\n" +
          `._gap-${unit} { gap: ${unit}px; }` +
          "\n" +
          `._left-${unit} { left: ${unit}px; }` +
          "\n" +
          `._right-${unit} { right: ${unit}px; }` +
          "\n" +
          `._top-${unit} { top: ${unit}px; }` +
          "\n" +
          `._bottom-${unit} { bottom: ${unit}px; }` +
          "\n" +
          `._font-size-${unit} { font-size: ${unit}px; }`,
      )
      .join("\n\n");

    style.innerHTML = classes;

    document.head.appendChild(style);
  });

  return null;
};
