import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { InputBase } from "@client/comps/input/InputBase";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Shared-Client/Comps/InputBase",
  component: InputBase,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    value: {
      control: {
        type: "text",
      },
    },
    placeholder: {
      control: {
        type: "text",
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
    error: {
      control: {
        type: "text",
      },
    },
    className: {
      options: [
        "",
        "grey-background",
        "overlay-background",
        "tertiary-grey",
        "focus",
        "overlay-background focus",
        "tertiary-grey focus",
        "error",
        "grey-background error",
        "tertiary-grey error",
      ],
      control: {
        type: "select",
      },
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { className: "primary-black" },
} satisfies Meta<typeof InputBase>;

export default meta;
type Story = StoryObj<typeof InputBase>;

export const BlackInput: Story = {
  args: {
    className: "",
    placeholder: "Default Input",
    value: "",
    disabled: false,
  },
};

export const GreyInput: Story = {
  args: {
    className: "grey-background",
    placeholder: "Grey Input",
    value: "",
    disabled: false,
  },
};

export const OverlayInput: Story = {
  args: {
    className: "overlay-background",
    placeholder: "Grey Input",
    value: "",
    disabled: false,
  },
};

export const BlackBigInput: Story = {
  args: {
    className: "lg",
    placeholder: "Big Black Input",
    value: "",
    disabled: false,
  },
};

export const GreyBigInput: Story = {
  args: {
    className: "grey-background lg",
    placeholder: "Overlay Input",
    value: "",
    disabled: false,
  },
};

export const OverlayBigInput: Story = {
  args: {
    className: "overlay-background lg",
    placeholder: "Overlay Big Input",
    value: "",
    disabled: false,
  },
};
