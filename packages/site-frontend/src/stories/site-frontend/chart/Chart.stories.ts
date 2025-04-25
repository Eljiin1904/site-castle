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

export const InvalidChart: Story = {
  args: {
    label: 'Invalid Chart',
    values: [
      { label: 'Feb', value: 10000000 },
      //@ts-ignore
      { label: 'Jan', value: 'test' },
      { label: 'Feb', value: 10000000 }
    ],
  },
};

export const LongLabelChart: Story = {
  args: {
    label: 'Long Label Chart Long Label Chart Long Label Chart Long Label Chart Long Label Chart Long Label ChartLong Label Chart Long Label Chart',
    values: [
      { label: 'Jan', value: 10000000 },
      { label: 'Feb', value: 20000000 },
      { label: 'Mar', value: 30000000 },
      { label: 'Apr', value: 40000000 },
      { label: 'May', value: 50000000 }
    ],
  },
};

export const SmallChart: Story = {
  args: {
    label: 'Small Chart',
    small: true,
    values: [
      { label: 'Jan', value: 10000000 },
      { label: 'Feb', value: 20000000 },
      { label: 'Mar', value: 30000000 },
      { label: 'Apr', value: 40000000 },
      { label: 'May', value: 50000000 },
      { label: 'Jun', value: 60000000 },
      { label: 'Jul', value: 70000000 },
      { label: 'Aug', value: 80000000 },
      { label: 'Sep', value: 90000000 },
      { label: 'Oct', value: 100000000 },
      { label: 'Nov', value: 110000000 },
      { label: 'Dec', value: 120000000 }
    ]
  }
};

export const SameValuesChart: Story = {
  args: {
    label: 'Linear Chart',
    values: [
      { label: 'Jan', value: 10000000 },
      { label: 'Apr', value: 10000000 },
      { label: 'Jul', value: 10000000 },
      { label: 'Oct', value: 10000000 }
    ]}
};

export const LinearChart: Story = {
  args: {
    label: 'Linear Chart',
    values: [
      { label: 'Jan', value: 10000000 },
      { label: 'Apr', value: 20000000 },
      { label: 'Jul', value: 30000000 },
      { label: 'Oct', value: 40000000 }
    ]}
};

export const NegativeChart: Story = {
  args: {
    label: 'Linear Chart',
    values: [
      { label: 'Jan', value: -10000000 },
      { label: 'Apr', value: -20000000 },
      { label: 'Jul', value: -30000000 },
      { label: 'Oct', value: -40000000 }
    ]}
};