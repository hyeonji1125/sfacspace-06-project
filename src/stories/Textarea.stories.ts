import type { Meta, StoryObj } from "@storybook/react";
import Textarea from "@/components/common/Textarea";

const meta = {
  title: "common/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      type: "string",
      description:
        "옵셔널한 값으로 필요한 경우 className을 통해 Textarea에 추가적인 tailwindCSS 속성을 부여합니다.",
    },
    placeholder: { control: "text", type: "string" },
    value: { control: "text", type: "string" },
    disabled: {
      control: "boolean",
      type: "boolean",
      description: "옵셔널한 값으로 disabled 상태가 필요할 때 사용합니다.",
    },
    required: {
      control: "boolean",
      type: "boolean",
      description: "옵셔널한 값으로 required 체크가 필요할 때 사용합니다.",
    },
  },
  args: {
    disabled: false,
    required: false,
    className: "w-[300px]",
    placeholder: "내용을 입력해 주세요.",
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const ValidFilled: Story = {
  args: {
    value: "올바른 값이 채워진 경우",
  },
};

export const Invalid: Story = {
  args: {
    required: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
