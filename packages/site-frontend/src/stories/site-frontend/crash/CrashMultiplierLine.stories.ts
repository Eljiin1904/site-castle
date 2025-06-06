import { CrashMultiplierLine } from "#app/comps/crash/CrashMultiplierLine";
import type { Meta, StoryObj } from "@storybook/react";


const meta = {
  title: "Site-Frontend/Comps/Crash/Multiplier Line",
  component: CrashMultiplierLine,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: {
        type: "number",
        min: 0,
        max: 1000,
        step: 1
      },
      description: "Position of the multiplier line in the chart. Defaults to 0."
    },
    status: {
      options: ["waiting", "pending", "simulating", "completed"],
      mapping: {
        waiting: "waiting",
        pending: "pending",
        simulating: "simulating",
        completed: "completed"
      },
      description: "Status of the multiplier line. Defaults to waiting.",
    },
    cashout: {
      control: {
        type: "number"
      },
      description: "If cashout is > 1, multiplier line is green and dashed and display the cashout value. Defaults to 1.",
    }
  }
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof CrashMultiplierLine>;

export default meta;
type Story = StoryObj<typeof CrashMultiplierLine>;
/**
 * A component that represents the state of the current multiplier in the Crash game.
 * It goes up while the game is running, and stops at the current multiplier when the game crash.
 * Initially, it starts at 1x and color is gray until the game starts.
 * Once the game starts, it changes to green and starts increasing.
 * When the game crashes, If the user cashes out before the crash, the multiplier is displayed in green.
 * If the user does not cash out before the crash, the multiplier is displayed in red. <br/>
 */
export const CrashContentGame: Story = {
  args: {
    position: 0,
  }
};