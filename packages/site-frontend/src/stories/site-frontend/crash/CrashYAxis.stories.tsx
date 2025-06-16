import { CrashYAxis } from "#app/comps/crash/CrashYAxis";
import type { Meta, StoryObj } from "@storybook/react";
import { Div } from "@client/comps/div/Div";

const meta = {
  title: "Site-Frontend/Comps/Crash/Crash Y Axis",
  component: CrashYAxis,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    multiplier: {
      control: {
        type: "number",
        min: 1,
        max: 6000
      },
      description: "Current multiplier value. Defaults to 1."
    }
  }
} satisfies Meta<typeof CrashYAxis>;


export default meta;
type Story = StoryObj<typeof meta>;

/**
* A component that displays the Y-axis of the Crash game chart.
 */
export const CrashContentGame: Story = {
  args: {
    multiplier: 1
  },
  decorators: [
    (Story) => (
      <Div style={{ border: "2px solid white", width: "100%", height: "300px", position: "relative" }}>
        <Story />
      </Div>
    )
  ]
};