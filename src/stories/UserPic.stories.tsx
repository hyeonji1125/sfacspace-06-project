import type { Meta, StoryObj } from "@storybook/react";
import UserPic from "@/components/common/UserPic";

const meta: Meta<typeof UserPic> = {
  title: "common/UserPic",
  component: UserPic,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    image: {
      control: "text",
      description: "이미지 경로",
      defaultValue: "https://picsum.photos/100/100",
    },
    name: {
      control: "text",
      description: "이미지 alt 속성에 사용될 유저 이름",
    },
    size: {
      control: "radio",
      options: ["small", "large"],
      description: "이미지 사이즈",
      defaultValue: "large",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: {
    size: "large",
    image: "https://picsum.photos/100/100",
    name: "john",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    image: "https://picsum.photos/100/100",
    name: "john",
  },
};
