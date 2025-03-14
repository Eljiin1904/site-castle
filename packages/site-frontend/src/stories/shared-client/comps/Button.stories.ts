import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Button } from '@client/comps/button/Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Shared-Client/Comps/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    onClick: { action: 'clicked' },
    kind: {
      options: [
        'primary-black',
        'secondary-black',
        'primary-yellow',
        'secondary-yellow',
        'tertiary-grey',
        'tertiary-black-overlay',
        'tertiary-white-overlay',
      ], 
      control: {
        type: 'select',        
      }
    },
    size: {
      options: [
        'xs',
        'sm',
        'md',
        'lg',
        'sso',
      ],
      control: {
        type: 'select',          
      }
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() , kind: 'primary-black', size: 'md' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const PrimaryBlack: Story = {
  args: {
    kind: "primary-black",
    label: 'Primary Black',
    disabled: false,
  },
};
PrimaryBlack.parameters = { pseudo: { hover: true } , rootSelector: "body"}

export const SecondaryBlack: Story = {
  args: {
    kind: "secondary-black",
    label: 'Secondary Black',
    disabled: false,
  },
};

export const PrimaryYellow: Story = {
  args: {
    kind: "primary-yellow",
    label: 'Primary Yellow',
    disabled: false,
  },
};

export const SecondaryYellow: Story = {
  args: {
    kind: "secondary-yellow",
    label: 'Secondary Yellow',
    disabled: false,
  },
};

export const TertiaryGrey: Story = {
  args: {
    kind: "tertiary-grey",
    label: 'Tertiary Grey',
    disabled: false,
  },
};

export const TertiaryBlackOverlay: Story = {
  args: {
    kind: "tertiary-black-overlay",
    label: 'Tertiary Black Overlay',
    disabled: false,
  },
};

export const TertiaryWhiteOverlay: Story = {
  args: {
    kind: "tertiary-white-overlay",
    label: 'Tertiary White Overlay',
    disabled: false,
  },
};