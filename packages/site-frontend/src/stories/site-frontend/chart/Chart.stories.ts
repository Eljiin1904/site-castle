import { Chart } from "#app/comps/charts/Chart";
import type { Meta, StoryObj } from "@storybook/react";


const meta = {
  title: "Site-Frontend/Comps/Chart",
  component: Chart,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof Chart>;

export default meta;
type Story = StoryObj<typeof Chart>;

export const EmptyChart: Story = {
  args: {
    label: 'Empty Chart',
    values: [],
  },
};

export const LinearChart: Story = {
  args: {
    label: 'Linear Chart',
    small: true,
    values: [
      { label: 'Jan', value: 10000000 },
      { label: 'Apr', value: 10000000 },
      { label: 'Jul', value: 10000000 },
      { label: 'Oct', value: 10000000 }
    ]}
};