import Button from "@/components/common/Button";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

const meta: Meta<typeof Button> = {
  title: "common/Buttons/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    theme: {
      control: "select",
      options: ["filled", "outlined", "tonal"],
    },
    size: {
      control: "select",
      options: ["default", "large", "middle", "small"],
    },
    isRound: { control: "boolean" },
    disabled: { control: "boolean" },
    children: { control: "text" },
    className: { control: "text" },
  },
  args: {
    onClick: fn(),
    size: undefined,
    isRound: false,
    disabled: false,
    className: "",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Filled
export const Filled: Story = {
  args: {
    theme: "filled",
    children: "Button",
  },
};

// Outlined
export const Outlined: Story = {
  args: {
    theme: "outlined",
    children: "Outlined Button",
  },
};

// Tonal
export const Tonal: Story = {
  args: {
    theme: "tonal",
    children: "Tonal Button",
  },
};
