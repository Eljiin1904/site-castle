import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "@client/comps/checkbox/Checkbox";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Shared-Client/Comps/Checkbox",
  component: Checkbox,
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
    },
    label: {
      control: {
        type: "text",
      },
    }
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const DefaultCheckbox: Story = {
  args: {
    value: false,
    disabled: false,
    label: "Default Checkbox",
  },
};

export const ActiveCheckbox: Story = {
  args: {
    value: true,
    disabled: false,
    label: "Active Checkbox",
  },
};

export const DefaultDisabledCheckbox: Story = {
  args: {
    value: false,
    disabled: true,
    label: "Default Disabled Checkbox",
  },
};

export const ActiveDisabledCheckbox: Story = {
  args: {
    value: true,
    disabled: true,
    label: "Active Disabled Checkbox",
  },
};
