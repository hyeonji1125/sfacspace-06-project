"use client";

import React, { SetStateAction, useState } from "react";
import {
  DropdownArrowIcon,
  DropdownCheckIcon,
} from "../../../public/assets/svg/SvgIcons";
import { twMerge } from "tailwind-merge";
import { TDropdownSelect } from "@/app/repos/_components/LibraryToolbar";

type TDropdownProps = {
  options?: string[];
  type: "type" | "sort";
  selectedOption: string;
  onSelect: React.Dispatch<SetStateAction<TDropdownSelect>>;
};

const Dropdown: React.FC<TDropdownProps> = ({
  options = ["최신순", "오래된순", "이름순"],
  selectedOption = "Sort",
  onSelect,
  type = "sort",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: string) => {
    onSelect((prev) => ({ ...prev, [type]: option }));
    setIsOpen(false);
  };

  return (
    <div className="relative z-10 inline-block w-auto min-w-[100px] text-left">
      <div>
        <button
          type="button"
          className={twMerge(
            "flex h-11 w-full items-center justify-between gap-1 rounded-lg border px-[13px] py-[10px] text-sm shadow-sm focus:outline-none",
            "border-text-gray-default bg-white dark:bg-custom-dropdown-dark-bg",
            "text-custom-light-text dark:text-custom-dark-text",
            "hover:bg-gray-50",
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="flex-1 whitespace-nowrap text-lg tracking-[-0.01em]">
            {selectedOption}
          </span>
          <DropdownArrowIcon className="text-custom-light-text dark:text-white" />
        </button>
      </div>

      {isOpen && (
        <div
          className={twMerge(
            "absolute right-0 mt-2 w-full origin-top-right rounded-md",
          )}
        >
          <div className="rounded-lg shadow-md">
            {options.map((option, index) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                className={twMerge(
                  "flex w-full items-center justify-center gap-2 py-[10px] text-center text-base hover:bg-bg-purple-dark dark:hover:bg-grayscale-80",
                  "text-custom-light-text dark:text-custom-dark-text",
                  "bg-white dark:bg-custom-dropdown-dark-bg",
                  option === selectedOption
                    ? "bg-custom-dropdown-option-light-bg dark:bg-grayscale-80"
                    : "",
                  index === 0 ? "rounded-t-md" : "",
                  index === options.length - 1 ? "rounded-b-md" : "",
                )}
              >
                {option === selectedOption && (
                  <DropdownCheckIcon
                    className="h-5 w-5"
                    color="dark:fill-custom-dark-text"
                  />
                )}
                <span>{option}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
