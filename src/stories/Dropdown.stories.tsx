import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Dropdown from '../components/common/Dropdown';
import { ThemeProvider } from 'next-themes';

const meta: Meta<typeof Dropdown> = {
  title: 'common/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['Type', 'Sort'],
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class">
        <div className="p-4">
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

// 기본 스토리
export const Default: Story = {
  args: {
    type: 'Type',
  },
};

// Sort 옵션 스토리
export const Sort: Story = {
  args: {
    type: 'Sort',
  },
};

