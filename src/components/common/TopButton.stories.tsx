import { Meta, StoryObj } from "@storybook/react";
import TopButton from "@/components/common/TopButton";

const meta: Meta<typeof TopButton> = {
  title: "common/TopButton",
  component: TopButton,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex h-[800px] items-center justify-center">
      <p className="">Scroll down to see the button</p>
      <TopButton />
    </div>
  ),
};
