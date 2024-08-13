"use client";

import React from "react";
import { Aldrich } from "next/font/google";
import {
  LightModeIcon,
  DarkModeIcon,
  FlawDetectorLogo,
} from "../../../public/assets/svg/SvgIcons";
import icons from "../../../public/assets/icons";
import Image from "next/image";
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
        <h1>
          <Image
            src={icons.MainLogo}
            alt="FlawDetector"
            className="h-[30px] w-[30px] md:hidden"
          />
          <FlawDetectorLogo
            className={"hidden md:block"}
            fill={theme === "dark" ? "white" : "black"}
          />
        </h1>
        <div className="flex items-center space-x-4 text-[14px] font-medium md:space-x-8 md:text-[18px]">
          <span>취약점 DB</span>
          <span>MY 저장소</span>
          <div
            className="flex cursor-pointer items-center justify-center rounded-full border-2 p-1"
            onClick={toggleTheme}
          >
            <LightModeIcon
              className={`${theme === "dark" ? "hidden" : "block"}`}
            />
            <DarkModeIcon
              className={`${theme === "dark" ? "block" : "hidden"}`}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
