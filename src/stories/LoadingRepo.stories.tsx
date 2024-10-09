import type { Meta, StoryObj } from "@storybook/react";
import LoadingRepo from "@/app/repos/_components/LoadingRepo";
import { ThemeProvider } from "next-themes";

const meta = {
  title: "Repository/LoadingRepo",
  component: LoadingRepo,
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
} satisfies Meta<typeof LoadingRepo>;

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
