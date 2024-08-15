import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import Header from "@/components/common/Header";
import { ThemeProvider } from "next-themes";

const meta: Meta<typeof Header> = {
  title: "common/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
    viewport: {
      viewports: {
        mobile: {
          name: "Mobile",
          styles: {
            width: "360px",
            height: "640px",
          },
        },
      },
      defaultViewport: "desktop",
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 Header 스토리 (데스크톱)
export const Default: Story = {
  args: {},
};

// 모바일 Header 스토리
export const Mobile: Story = {
  args: {},
  parameters: {
    viewport: {
      defaultViewport: "mobile",
    },
    docs: {
      story: {
        inline: true,
        iframeHeight: 640,
      },
    },
  },
};


// 다크 모드에서의 Header 스토리
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