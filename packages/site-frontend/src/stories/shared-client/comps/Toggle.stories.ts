import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "@client/comps/toggle/Toggle";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Shared-Client/Comps/Toggle",
  component: Toggle,
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
        type: "boolean",
      },
    },
    disabled: {
      control: {
        type: "boolean",
      },
    }
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof Toggle>;

export const ToggleOff: Story = {
  args: {
    value: false,
    disabled: false,
  },
};

export const ToggleOn: Story = {
  args: {
    value: true,
    disabled: false,
  },
};

export const ToggleOffDisabled: Story = {
  args: {
    value: false,
    disabled: true,
  },
};

export const ToggleOnDisabled: Story = {
  args: {
    value: true,
    disabled: true,
  },
};
