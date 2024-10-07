import React, { useState } from "react";
import type { Meta, StoryFn } from "@storybook/react";
import Dropdown from "../components/common/Dropdown";
import { fn } from "@storybook/test";
import { TDropdownSelect } from "@/app/repos/_components/LibraryToolbar";
import { ThemeProvider } from "next-themes";

const meta = {
  title: "common/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    id: {
      control: "text",
      description: "드롭다운 id 지정",
    },
    selectedOption: {
      control: "text",
      defaultValue: "Sort",
      description: "선택된 옵션 텍스트 노출",
    },
    options: {
      control: "object",
      description: "드롭다운 옵션 리스트",
      defaultValue: ["최신순", "오래된순", "이름순"],
    },
    onSelect: {
      action: "clicked",
      description: "옵션 선택 온클릭 이벤트",
    },
    openDropdownId: {
      control: "text",
      description: "현재 오픈된 드롭다운 id",
    },
    setOpenDropdownId: {
      action: "clicked",
      description: "오픈된 드롭다운 id 변경 이벤트",
    },
    type: {
      control: "radio",
      options: ["sort", "type"],
      description: "드롭다운 종류",
    },
  },
  args: {
    onSelect: fn(),
    setOpenDropdownId: fn(),
    options: ["최신순", "오래된순", "이름순"],
    id: "dropdown-sort",
    type: "sort",
  },
} satisfies Meta<typeof Dropdown>;

export default meta;

const Template: StoryFn<typeof Dropdown> = (args) => {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<TDropdownSelect>({
    type: "Type",
    sort: "Sort",
  });

  return (
    <ThemeProvider>
      <div className="flex h-[400px] w-full justify-center">
        <Dropdown
          id={args.id}
          selectedOption={selectedItem[args.type as "type" | "sort"]}
          onSelect={(option) => {
            setSelectedItem((prev) => ({
              ...prev,
              [args.type]: option,
            }));
          }}
          options={args.options}
          openDropdownId={openDropdownId}
          setOpenDropdownId={setOpenDropdownId}
          type={args.type}
        />
      </div>
    </ThemeProvider>
  );
};

export const Default = Template.bind({});
Default.args = {};

export const DarkMode = Template.bind({});
DarkMode.args = {};
DarkMode.parameters = {
  backgrounds: { default: "dark" },
};
DarkMode.decorators = [
  (Story) => (
    <ThemeProvider forcedTheme="dark">
      <div className="dark">
        <Story />
      </div>
    </ThemeProvider>
  ),
];
