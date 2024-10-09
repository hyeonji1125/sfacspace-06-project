import type { Meta, StoryObj } from "@storybook/react";
import ClippingArticle from "@/app/me/(me-layout)/scraps/_components/ClippingArticle";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

const meta = {
  title: "Scrap/ClippingArticle",
  component: ClippingArticle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      action: "clicked",
      description: "온클릭 액션",
    },
    name: {
      control: "object",
      description: "필터링된 레포지토리 배열",
    },
    created_at: { action: "clicked", description: "온클릭 액션" },
  },
  args: {
    label: "취약성 보고서",
    name: "A 기업 취약성 보고서",
    created_at: "2024-10-04 11:22",
  },
  decorators: [
    (Story) => (
      <SessionProvider>
        <ThemeProvider>
          <Story />
        </ThemeProvider>
      </SessionProvider>
    ),
  ],
} satisfies Meta<typeof ClippingArticle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Report: Story = {
  args: {},
};

export const Notice: Story = {
  args: {
    label: "취약성 알림",
    name: "A 기업 취약성 알림",
  },
};

export const Warning: Story = {
  args: {
    label: "취약성 경고",
    name: "A 기업 취약성 경고",
  },
};

export const Other: Story = {
  args: {
    label: "기타",
    name: "2줄 이상의 텍스트까지 표시되며 그 이상의 텍스트는 생략됩니다. 예를들어",
  },
};

export const DarkMode: Story = {
  args: {},
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
