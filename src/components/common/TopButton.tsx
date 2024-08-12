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
          "fixed bottom-8 right-8 z-20 flex h-[76px] w-[76px] flex-col items-center justify-center gap-2 rounded-full border-[1.46px] px-4",
          "border-primary-purple-500 bg-white text-primary-purple-500 shadow-md transition-all duration-200 ease-in-out",
          "hover:border-none hover:bg-primary-purple-500 hover:text-white",
          "dark:border-none dark:bg-primary-purple-500 dark:text-white",
          "dark:hover:bg-primary-purple-400 dark:hover:text-white",
          topButtonVisible
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-0 opacity-0",
        )}
      >
        <FaArrowUp className="h-8 w-8 p-[2px]" />
        <span className="text-xs">TOP</span>
      </button>
    </>
  );
}
