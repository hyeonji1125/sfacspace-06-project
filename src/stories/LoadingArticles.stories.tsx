import type { Meta, StoryObj } from "@storybook/react";
import LoadingArticles from "@/app/me/(me-layout)/scraps/_components/LoadingArticles";
import { ThemeProvider } from "next-themes";

const meta = {
  title: "Scrap/LoadingArticles",
  component: LoadingArticles,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div className="w-[1280px]">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof LoadingArticles>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
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
