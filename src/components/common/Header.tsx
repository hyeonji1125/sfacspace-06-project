"use client";

import { useTheme } from "next-themes";
import { Aldrich } from "next/font/google";
import Image from "next/image";
import React from "react";
import icons from "../../../public/assets/icons";
import {
  DarkModeIcon,
  FlawDetectorLogo,
  LightModeIcon,
} from "../../../public/assets/svg/SvgIcons";

import Link from "next/link";

const aldrich = Aldrich({ weight: "400", subsets: ["latin"] });

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white bg-[rgba(255,255,255,0.16)] px-4 py-4 backdrop-blur-md dark:border-custom-dark-bg dark:bg-[rgba(0,0,0,0.16)] md:px-20 md:py-12">
      <div className="flex items-center justify-between text-custom-light-text dark:text-custom-dark-text">
        <Link href="/">
          <h1>
            <Image
              src={icons.MainLogo}
              alt="FlawDetector"
              className="h-[30px] w-[30px] lg:hidden"
            />
            <FlawDetectorLogo
              className={"hidden lg:block"}
              fill="currentColor"
            />
          </h1>
        </Link>
        <div className="flex items-center space-x-4 text-[14px] font-medium md:space-x-8 md:text-[18px]">
          <Link
            href="/vulnerability-db"
            className="cursor-pointer hover:text-accent-blue"
          >
            취약점 DB
          </Link>

          <span>MY 저장소</span>
          <div
            className="flex cursor-pointer items-center justify-center rounded-full border-2 px-1 py-1"
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
