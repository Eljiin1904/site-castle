
import { CrashCountdown } from "#app/comps/crash/CrashCountdown";
import type { Meta, StoryObj } from "@storybook/react";


const meta = {
  title: "Site-Frontend/Comps/Crash/Crash Countdown",
  component: CrashCountdown,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    time: {
      control: {
        type: "number",
        min: 0,
        max: 6000,
        step: 1000
      },
      description: "Time in milliseconds before the game starts. Defaults to 5000."
    }
  }
} satisfies Meta<typeof CrashCountdown>;


export default meta;
type Story = StoryObj<typeof CrashCountdown>;
/**
  * A component that displays a countdown before the Crash game starts.
  * It shows the time remaining in seconds and a message indicating that the game is starting.
 */
export const CrashContentGame: Story = {
  args: {
    time: 5000
  }
};