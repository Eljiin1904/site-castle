import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "@client/comps/dropdown/Dropdown";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Shared-Client/Comps/Dropdown",
  component: Dropdown,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    type: {
      options: [
        'select',
        'filter',
        'menu',
        'custom'
      ], 
      control: {
        type: 'select',        
      }
    },
    disabled: {
      control: {
        type: "boolean",
      },
    },
    size: {
      options: [
        'md',
        'lg'
      ],
      control: {
        type: 'select',
      }
    }
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const DropdownSelect: Story = {
  args: {
    type: "select",
    disabled: false,
    options: [
      "Most Popular",
      "Highest Price",
      "Lowest Price",
    ],
    value: 0,
    tag: "Sort By:",
    size: "md",
  },
};

export const FilterSelect: Story = {
  args: {
    type: "filter",
    disabled: false,
    options: [
      "Most Popular",
      "Highest Price",
      "Lowest Price",
    ],
    tag: "Filter By:",
    label: "Filter",
    filter: [false, false, false],
    //size: "md",
  },
};