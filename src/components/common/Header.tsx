"use client";

import React from "react";
import { Aldrich } from "next/font/google";
import useDarkModeStore from "../../store/useDarkModeStore";
import {
  LightModeIcon,
  DarkModeIcon,
} from "../../../public/assets/svg/SvgIcons";
import icons from "../../../public/assets/icons";
import Image from "next/image";
import { twJoin } from "tailwind-merge";

const aldrich = Aldrich({ weight: "400", subsets: ["latin"] });
const Header: React.FC = () => {
  const darkMode = useDarkModeStore((state) => state.darkMode);
  const toggleDarkMode = useDarkModeStore((state) => state.toggleDarkMode);

  return (
    <header className="fixed w-full bg-custom-light-bg px-4 py-4 dark:bg-custom-dark-bg md:px-20 md:py-12">
      <div className="flex items-center justify-between text-custom-light-text dark:text-custom-dark-text">
        <div className="flex items-center">
          <Image
            src={icons.MainLogo}
            alt="Flaw Detector Logo"
            className="h-[30px] md:h-[35px]"
          />
          <span
            className={twJoin(
              "ml-2 hidden text-center text-[20px] tracking-[-0.01em] text-black dark:text-custom-dark-text md:ml-4 md:block md:text-[40px]",
              aldrich.className,
            )}
          >
            FLAWDETECTOR
          </span>
        </div>
        <div className="flex items-center space-x-4 text-[14px] font-medium md:space-x-8 md:text-[18px]">
          <span>취약점 DB</span>
          <span>MY 저장소</span>
          <div className="flex items-center justify-center rounded-full border-2 p-1">
            <input
              type="checkbox"
              id="light-switch"
              name="light-switch"
              className="light-switch sr-only"
              checked={darkMode}
              onChange={toggleDarkMode}
            />
            <label className="relative cursor-pointer" htmlFor="light-switch">
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
