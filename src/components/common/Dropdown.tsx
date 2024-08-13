import React, { useState } from 'react';
import { DropdownProps } from '@/types';
import { DropdownArrowIcon } from '../../../public/assets/svg/SvgIcons';

const Dropdown: React.FC<DropdownProps> = ({ type, selectedOption, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = type === 'Type' ? ['폴더순', '파일순'] : ['최신순', '오래된순', '이름순'];

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="w-auto gap-1 inline-flex justify-between rounded-lg border border-custom-dropdown-light-border shadow-sm px-[13px] py-[10px] bg-custom-dropdown-light-bg dark:bg-custom-dropdown-dark-bg text-sm  hover:bg-gray-50 focus:outline-none text-custom-light-text dark:text-custom-dark-text"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className='text-[20px] tracking-[-0.01em]'>
            {selectedOption}
          </span>
          <DropdownArrowIcon className="text-custom-light-text dark:text-white" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 rounded-md shadow-lg bg-custom-dropdown-light-bg dark:bg-custom-dropdown-dark-bg ring-1 ring-black ring-opacity-5 w-full ">
          <div className="py-1">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                className={`block px-4 py-2 text-sm text-custom-light-text dark:text-custom-dark-text w-full text-left  ${option === selectedOption ? 'bg-gray-100 font-bold' : ''
                  }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
