import type { Preview } from "@storybook/react";
import "../../shared-client/src/styles/defaults.scss";
import "../../shared-client/src/styles/styled.scss";
import { Style } from "../../shared-client/src/services/style";

const appendStyle = () => {

  const elementId = "app-colors";
  let style = document.getElementById(elementId);

  if (!style) {
    style = document.createElement("style");
    style.id = elementId;
  }

  const variables = Object.keys(Style.colors)
    .map((key) => `--${key}-color: ${(Style.colors as any)[key]};`)
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
};
appendStyle();

const appendUnits = () => {
  
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
};
appendUnits();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      values: [
        { name: 'Dark', value: '#1D1A19' },
        { name: 'Light', value: '#FFFFFF' },
        { name: 'Yellow', value: '#F1E9A0' }
      ],
      default: 'Dark',
    },
  },
};


export default preview;
