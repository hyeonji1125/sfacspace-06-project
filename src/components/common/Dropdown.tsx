"use client";

import React, { useEffect, useRef } from "react";
import {
  DropdownArrowIcon,
  DropdownCheckIcon,
} from "../../../public/assets/svg/SvgIcons";
import { twMerge } from "tailwind-merge";
import { TDropdownSelect } from "@/app/repos/_components/LibraryToolbar";

type TDropdownProps = {
  id: string;
  options?: string[];
  type: keyof TDropdownSelect;
  selectedOption: string;
  onSelect: (option: string) => void;
  openDropdownId: string | null;
  setOpenDropdownId: React.Dispatch<React.SetStateAction<string | null>>;
};

const Dropdown: React.FC<TDropdownProps> = ({
  id,
  options = ["최신순", "오래된순", "이름순"],
  selectedOption = "Sort",
  onSelect,
  type = "sort",
  openDropdownId,
  setOpenDropdownId,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isOpen = openDropdownId === id;

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setOpenDropdownId(null);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setOpenDropdownId(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
          onClick={() => setOpenDropdownId(isOpen ? null : id)}
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
