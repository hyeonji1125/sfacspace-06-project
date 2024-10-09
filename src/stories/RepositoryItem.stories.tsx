import type { Meta, StoryObj } from "@storybook/react";
import RepositoryItem from "@/app/repos/_components/RepositoryItem";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

const meta = {
  title: "Repository/RepositoryItem",
  component: RepositoryItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "text",
      description: "레포지토리 타이틀",
    },
    owner: {
      control: "object",
      description: "레포지토리 소유자",
    },
    created_at: { control: "text", description: "레포지토리 생성일" },
    matchData: {
      control: "object",
      description:
        "DB 매치데이터로 북마크(true/false)와 status 상태 칩(IN_PROGRESS/COMPLETED) 상태 변경",
    },
  },
  args: {
    name: "project-1",
    owner: { login: "john" },
    created_at: "2024-10-11 13:22",
    matchData: {
      bookmark: false,
      status: undefined,
    },
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
} satisfies Meta<typeof RepositoryItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Bookmarked: Story = {
  args: { matchData: { bookmark: true } },
};

export const InProgress: Story = {
  args: { matchData: { status: "IN_PROGRESS" } },
};

export const Completed: Story = {
  args: { matchData: { status: "COMPLETED" } },
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
