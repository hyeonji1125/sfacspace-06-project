"use client";

import React from "react";
import { Aldrich } from "next/font/google";
import {
  LightModeIcon,
  DarkModeIcon,
} from "../../../public/assets/svg/SvgIcons";
import icons from "../../../public/assets/icons";
import Image from "next/image";
import { twJoin } from "tailwind-merge";
import { useTheme } from "next-themes"; // useTheme 훅을 사용하여 테마 관리

const aldrich = Aldrich({ weight: "400", subsets: ["latin"] });

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme(); // 테마 관련 훅

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky w-full bg-custom-light-bg px-4 py-4 dark:bg-custom-dark-bg md:px-20 md:py-12">
      <div className="flex items-center justify-between text-custom-light-text dark:text-custom-dark-text">
        <h1 className="flex items-center">
          <Image
            src={icons.MainLogo}
            alt="Flaw Detector Logo"
            className="h-[30px] w-[30px] md:h-[35px] md:w-[35px]"
          />
          <span
            className={twJoin(
              "ml-2 hidden text-center text-[20px] tracking-[-0.01em] text-black dark:text-custom-dark-text md:ml-4 md:block md:text-[40px] md:mt-2",
              aldrich.className,
            )}
          >
            FLAWDETECTOR
          </span>
        </h1>
        <div className="flex items-center space-x-4 text-[14px] font-medium md:space-x-8 md:text-[18px]">
          <span>취약점 DB</span>
          <span>MY 저장소</span>
          <div
            className="flex items-center justify-center rounded-full border-2 p-1 cursor-pointer"
            onClick={toggleTheme}
          >
            <LightModeIcon className={`${theme === "dark" ? "hidden" : "block"}`} />
            <DarkModeIcon className={`${theme === "dark" ? "block" : "hidden"}`} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
