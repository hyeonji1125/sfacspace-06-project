import type { Meta, StoryObj } from "@storybook/react";
import ReposFilterButtons from "@/app/repos/_components/ReposFilterButtons";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { fn } from "@storybook/test";

const meta = {
  title: "Repository/ReposFilterButtons",
  component: ReposFilterButtons,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    setRepos: {
      action: "clicked",
      description: "온클릭 액션",
    },
    repositories: {
      control: "object",
      description: "필터링된 레포지토리 배열",
    },
  },
  args: {
    setRepos: fn,
    repositories: [],
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
} satisfies Meta<typeof ReposFilterButtons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
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
