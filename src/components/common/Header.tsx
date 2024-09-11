"use client";

import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import icons from "../../../public/assets/icons";
import {
  DarkModeIcon,
  FlawDetectorLogo,
  LightModeIcon,
} from "../../../public/assets/svg/SvgIcons";
import Link from "next/link";
import { useGetUser } from "@/hooks/useGetUser";
import { customSignOut } from "@/lib/customAuth";

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { session, status, email } = useGetUser();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!session) {
      localStorage.removeItem("githubStorage");
    }
  }, [session]);

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
            href="/vuldb"
            className="cursor-pointer hover:text-primary-purple-500"
          >
            취약점 DB
          </Link>

          <Link
            href="/repos"
            className="cursor-pointer hover:text-primary-purple-500"
          >
            MY 저장소
          </Link>

          {status === "authenticated" && (
            <span
              className="cursor-pointer hover:text-primary-purple-500"
              onClick={() => {
                if (email) customSignOut(email, "/");
              }}
            >
              로그아웃
            </span>
          )}

          {mounted && (
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
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
