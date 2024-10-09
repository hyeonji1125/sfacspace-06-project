import type { Meta, StoryObj } from "@storybook/react";
import Input from "@/components/common/Input";
import { ThemeProvider } from "next-themes";

const meta = {
  title: "common/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    className: {
      control: "text",
      description:
        "옵셔널한 값으로 필요한 경우 className을 통해 Input에 추가적인 tailwindCSS 속성을 부여합니다.",
    },
    placeholder: {
      control: "text",
      description: "플레이스홀더 텍스트",
      defaultValue: "내용을 입력해 주세요.",
    },
    value: { control: "text", type: "string", description: "인풋 밸류" },
    type: {
      control: "select",
      options: ["text", "email", "password"],
      description: "input 타입을 지정합니다.",
    },
    disabled: {
      control: "boolean",
      description: "옵셔널한 값으로 disabled 상태가 필요할 때 사용합니다.",
      defaultValue: false,
    },
    required: {
      control: "boolean",
      description: "옵셔널한 값으로 required 체크가 필요할 때 사용합니다.",
      defaultValue: false,
    },
  },
  args: {
    disabled: false,
    required: false,
    className: "w-[300px]",
    placeholder: "내용을 입력해 주세요.",
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    type: "text",
  },
};

export const ValidFilled: Story = {
  args: {
    value: "올바른 값이 채워진 경우",
    type: "text",
  },
};

export const Invalid: Story = {
  args: {
    value: "잘못된 값인 경우",
    type: "email",
  },
};

export const Disabled: Story = {
  args: {
    type: "text",
    disabled: true,
  },
};

export const DarkMode: Story = {
  args: {
    type: "text",
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
  decorators: [
    (Story) => (
      <ThemeProvider forcedTheme="dark">
        <div className="dark">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};
