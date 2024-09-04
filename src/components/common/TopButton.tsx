"use client";
import useVisibilityStore from "@/store/useVisibilityStore";
import { useEffect } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { twJoin } from "tailwind-merge";

export default function TopButton() {
  const { topButtonVisible, setTopButtonVisible } = useVisibilityStore();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;

      if (scrollY > 300) {
        setTopButtonVisible(true);
      } else {
        setTopButtonVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setTopButtonVisible]); 

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <button
        onClick={scrollToTop}
        className={twJoin(
          "fixed bottom-5 right-5 z-20 flex h-12 w-12 flex-col items-center justify-center gap-0 rounded-full border-[1.46px] px-5 sm:h-16 sm:w-16 sm:gap-1 md:bottom-8 md:right-8 md:h-[76px] md:w-[76px] md:gap-2",
          "border-primary-purple-500 bg-white text-primary-purple-500 shadow-md transition-all duration-200 ease-in-out",
          "hover:border-none hover:bg-primary-purple-500 hover:text-white",
          "dark:border-none dark:bg-primary-purple-500 dark:text-white",
          "dark:hover:bg-primary-purple-400 dark:hover:text-white",
          topButtonVisible
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-0 opacity-0"
        )}
      >
        <FaArrowUp className="h-8 w-8 p-[6px] sm:p-[2px]" />
        <span className="hidden text-xs sm:block">TOP</span>
      </button>
    </>
  );
}
