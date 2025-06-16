

import { CrashChartContainer } from "#app/comps/crash/CrashChartContainer";
import { Div } from "@client/comps/div/Div";
import type { Meta, StoryObj } from "@storybook/react";


const meta = {
  title: "Site-Frontend/Comps/Crash/Crash Chart",
  component: CrashChartContainer,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof CrashChartContainer>;


export default meta;
type Story = StoryObj<typeof CrashChartContainer>;
/**
  * A component that displays the Crash game chart, including crash events, multipliers, and countdowns.
 */
export const CrashContentGame: Story = {
  args: {
    multiplier: 1,
    onclick: () => {alert("This is a placeholder for the click event handler.")},
  },
  decorators: [
    (Story) => (
      <Div style={{ border: "2px solid white", width: "100%", height: "300px", position: "relative" }}>
        <Story />
      </Div>
    )
  ]
};