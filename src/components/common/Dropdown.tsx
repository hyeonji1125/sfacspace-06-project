'use client';

import React from 'react';
import { DropdownProps } from '@/types/utils';
import { DropdownArrowIcon, DropdownCheckIcon } from '../../../public/assets/svg/SvgIcons';
import { twMerge } from 'tailwind-merge';
import { useDropdownStore } from '@/store/useDropdownStore';

const Dropdown: React.FC<DropdownProps> = ({ type }) => {
  const { selectedType, setSelectedType, selectedSort, setSelectedSort } = useDropdownStore();

  const isTypeDropdown = type === 'Type';
  const options = isTypeDropdown ? ['폴더순', '파일순'] : ['최신순', '오래된순', '이름순'];
  const selectedOption = isTypeDropdown ? selectedType : selectedSort;
  const setSelectedOption = isTypeDropdown ? setSelectedType : setSelectedSort;

  const [isOpen, setIsOpen] = React.useState(false);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left z-10" style={{ width: '120px' }}>
      <div>
        <button
          type="button"
          className={twMerge(
            "w-full flex items-center gap-1 justify-between rounded-lg border shadow-sm px-[13px] py-[10px] text-sm focus:outline-none",
            "border-custom-dropdown-light-border bg-custom-dropdown-light-bg dark:bg-custom-dropdown-dark-bg",
            "text-custom-light-text dark:text-custom-dark-text",
            "hover:bg-gray-50",
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className='flex-1 text-[18px] tracking-[-0.01em]'>
            {selectedOption}
          </span>
          <DropdownArrowIcon className="text-custom-light-text dark:text-white" />
        </button>
      </div>


      {isOpen && (
        <div className={twMerge(
          "origin-top-right absolute right-0 mt-2 rounded-md w-full",
        )}>
          <div className="py-1">
            {options.map((option, index) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                className={twMerge(
                  "flex items-center justify-center gap-2 py-[10px] text-[14px] w-full text-center",
                  "text-custom-light-text dark:text-custom-dark-text",
                  "bg-white dark:bg-custom-dropdown-dark-bg shadow-2xl",
                  option === selectedOption ? "bg-custom-dropdown-option-light-bg dark:bg-gray-200 dark:text-custom-light-text font-bold" : "",
                  index === 0 ? "rounded-t-md" : "",
                  index === options.length - 1 ? "rounded-b-md" : ""
                )}
              >
                {option === selectedOption && (
                  <DropdownCheckIcon className="h-5 w-5" />
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
