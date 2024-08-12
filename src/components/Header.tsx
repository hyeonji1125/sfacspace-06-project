'use client';

import React from 'react';
import { LightModeIcon, DarkModeIcon } from '../../public/assets/svg/SvgIcons';
import icons from '../../public/assets/icons';
import Image from 'next/image';
import { useDarkMode } from '@/contexts/DarkModeContext';

const Header: React.FC = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <header className="fixed w-full bg-custom-light-bg dark:bg-custom-dark-bg px-4 py-4 md:px-20 md:py-12 z-10">
      <div className="flex items-center justify-between text-custom-light-text dark:text-custom-dark-text">
        <div className="flex items-center">
          <Image src={icons.MainLogo} alt="Flaw Detector Logo" className="h-[30px] md:h-[35px]" />
          <span className="ml-2 md:ml-4 text-[20px] md:text-[40px] tracking-[-0.01em] text-center hidden md:block">
            FLAWDETECTOR
          </span>
        </div>
        <div className="flex items-center space-x-4 md:space-x-8 text-[14px] md:text-[18px] font-medium">
          <span>취약점 DB</span>
          <span>MY 저장소</span>
          <div className="flex items-center justify-center border-2 rounded-full p-1">
            <input
              type="checkbox"
              id="light-switch"
              name="light-switch"
              className="light-switch sr-only"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
            <label className="relative cursor-pointer" htmlFor="light-switch">
              <LightModeIcon className={`${darkMode ? 'hidden' : 'block'}`} />
              <DarkModeIcon className={`${darkMode ? 'block' : 'hidden'}`} />
            </label>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
