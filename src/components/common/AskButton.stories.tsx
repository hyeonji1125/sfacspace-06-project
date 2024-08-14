import AskButton from "@/components/common/AskButton";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof AskButton> = {
  title: "common/Buttons/AskButton",
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
