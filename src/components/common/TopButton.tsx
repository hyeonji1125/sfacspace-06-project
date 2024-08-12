"use client";
import useVisibilityStore from "@/store/useVisibilityStore";
import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { twJoin } from "tailwind-merge";

export default function TopButton() {
  const { topButtonVisible, setTopButtonVisible } = useVisibilityStore();

  const handleScroll = () => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    if (scrollY > 300) {
      setTopButtonVisible(true);
    } else {
      setTopButtonVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <button
        onClick={scrollToTop}
        className={twJoin(
          "px-4 fixed bottom-8 right-8 z-20 w-[76px] h-[76px] border-[1.46px] rounded-full flex flex-col gap-2 items-center justify-center",
          "border-primary-purple-500 bg-white text-primary-purple-500 shadow-md transition-all duration-200 ease-in-out",
          "hover:border-none hover:bg-primary-purple-500 hover:text-white",
          "dark:bg-primary-purple-500 dark:text-white dark:border-none",
          "dark:hover:bg-primary-purple-400 dark:hover:text-white",
          topButtonVisible
            ? "opacity-100 scale-100"
            : "opacity-0 scale-0 pointer-events-none"
        )}
      >
        <FaArrowUp className="w-8 h-8 p-[2px]" />
        <span className="text-xs">TOP</span>
      </button>
    </>
  );
}
