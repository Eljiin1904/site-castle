import { CrashMultiplierLine } from "#app/comps/crash/CrashMultiplierLine";
import type { Meta, StoryObj } from "@storybook/react";


const meta = {
  title: "Site-Frontend/Comps/Crash/Multiplier Line",
  component: CrashMultiplierLine,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof CrashMultiplierLine>;

export default meta;
type Story = StoryObj<typeof CrashMultiplierLine>;

export const CrashContentGame: Story = {
  args: {
    // color: "bright-green",
    position: 0,
  }
};