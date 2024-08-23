import { Meta, StoryObj } from "@storybook/react";
import InputChips from "@/components/common/chips/InputChips";

const meta: Meta<typeof InputChips> = {
  title: "common/chips/InputChips",
  component: InputChips,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    inputType: {
      control: "select",
      options: ["textOnly", "sideIcon", "percentage", "leftIcon"],
    },
    children: { control: "text" },
  },
  args: {
    inputType: "textOnly",
    children: "InputChips",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

//TextOnly
export const TextOnly: Story = {
  args: {
    inputType: "textOnly",
    children: "textOnly",
  },
};

//SideIcon
export const SideIcon: Story = {
  args: {
    inputType: "sideIcon",
    children: "SideIcon",
  },
};

//Percentage
export const Percentage: Story = {
  args: {
    inputType: "percentage",
    children: "Percentage",
  },
};

//LeftIcon
export const LeftIcon: Story = {
  args: {
    inputType: "leftIcon",
    children: "LeftIcon",
  },
};
