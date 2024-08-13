import { Meta, StoryObj } from "@storybook/react";
import AskButton from "@/components/common/AskButton";
import TopButton from "./TopButton";

const meta: Meta<typeof AskButton> = {
  title: "common/AskButton",
  component: AskButton,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="h-[500px]">
      <AskButton />
    </div>
  ),
};
