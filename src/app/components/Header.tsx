'use client';

import React from 'react';
import useDarkModeStore from '../store/useDarkModeStore';
import { LightModeIcon, DarkModeIcon } from '@/app/assets/svg/SvgIcons';
import icons from '../assets/icons';
import Image from 'next/image';

const Header: React.FC = () => {
  const darkMode = useDarkModeStore((state) => state.darkMode);
  const setDarkMode = useDarkModeStore((state) => state.setDarkMode);
  const toggleDarkMode = useDarkModeStore((state) => state.toggleDarkMode);

  return (
    <header className=" bg-custom-light-bg dark:bg-custom-dark-bg px-20 py-12">
      <div className="flex items-center justify-between text-custom-light-text dark:text-custom-dark-text">
        <div className="flex items-center">
          <Image src={icons.MainLogo} alt="Flaw Detector Logo" className="h-[35px]" />
          <span className="ml-4 text-[40px] tracking-[-0.01em] text-center">FLAWDETECTOR</span>
        </div>
        <div className="flex items-center space-x-8 text-[18px] font-medium">
          <span>취약점 DB</span>
          <span>MY 저장소</span>
          <div className="flex flex-col justify-center border-2 rounded-[50%]">
            <input type="checkbox" id="light-switch" name="light-switch" className="light-switch sr-only" checked={darkMode} onChange={toggleDarkMode} />
            <label className="relative cursor-pointer p-2" htmlFor="light-switch">
              <LightModeIcon className={`${darkMode ? "hidden" : "block"}`} />
              <DarkModeIcon className={`${darkMode ? "block" : "hidden"}`} />
              <span className="sr-only">Switch to light / dark version</span>
            </label>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
