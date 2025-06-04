import { CrashEvent } from "#app/comps/crash/CrashEvent";
import type { Meta, StoryObj } from "@storybook/react";


const meta = {
  title: "Site-Frontend/Comps/Crash/Crash Event",
  component: CrashEvent,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    height: {
      control: {
        type: "number",
        min: 4,
        step: 1
      },
      description: "Height of the event in pixels. Minimum is 4."
    },
    color: {
      control: {
        type: "select",
        options: ["bright-green", "bright-red"]
      },
      description: "Color of the event. Only green and red. Defaults to green."
    },
    width: {
      control: {
        type: "number",
        min: 1,
        max: 50,
        step: 1
      },
      description: "Width of the event in pixels. Defaults to 10."
    },
    position: {
      control: {
        type: "number",
        min: -1000,
        max: 1000,
        step: 1
      },
      description: "Position of the event in the chart. Defaults to 0."
    },
    startAtLine: {
      control: {
        type: "boolean"
      },
      description: "If true, the event starts at the line. Defaults to false."
    },
    animated: {
      control: {
        type: "boolean"
      },
      description: "If true, the event will animate to its position. Defaults to true."
    }
  }
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof CrashEvent>;


export default meta;
type Story = StoryObj<typeof CrashEvent>;
/**
 * A component that represents a crash event in the game. It displays a colored rectangle that animates to represent the crash event.
 * Crash events are used to visualize the crash multiplier in the game, and can be used to indicate when a player has crashed out of the game.
 * A green event indicates an active multiplier, while a red event indicates a crash. Red event is display next to a green one when a crash occurs.
 * At the start of each round, an animation is done using randomly generated events to simulate the stock market.<br/><br/>
 * @param height - The height of the event in pixels. Minimum is 4.<br/>
 * @param color - Color of the event. Only green and red. Defaults to green.<br/>
 * @param width - Width of the event in pixels. Defaults to 10.<br/>
 * @param position - The position of the event in the chart. Defaults to 0.<br/>
 * @param startAtLine - If true, the event starts at the line. Defaults to false.<br/>
 * @param animated - If true, the event will animate to its position. Defaults to true.<br/>
 */
export const CrashContentGame: Story = {
  args: {
    position: 0,
    height: 100,
    startAtLine:true,
  }
};