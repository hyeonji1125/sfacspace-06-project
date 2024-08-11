"use client";
import useVisibilityStore from "@/store/useVisibilityStore";
import { useState } from "react";
import { IoChatbubble } from "react-icons/io5";
import { twMerge } from "tailwind-merge";

export default function AskButton() {
  const topButtonVisible = useVisibilityStore(
    (state) => state.topButtonVisible
  );

  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <div
        className={twMerge(
          "fixed right-8 z-20 flex flex-col items-end gap-6 transition-all duration-500",
          topButtonVisible ? "bottom-32" : "bottom-8"
        )}
      >
        {isChatOpen && (
          <div className="bg-white rounded-3xl shadow-lg w-96 h-96 flex items-center justify-center">
            chat
          </div>
        )}
        <button
          onClick={() => setIsChatOpen((prev) => !prev)}
          className="px-4 w-[76px] h-[76px] border-[1.46px] rounded-full flex items-center justify-center
           border-primary-purple-500 bg-white text-primary-purple-500 shadow-md transition-all duration-200 ease-in-out 
           hover:border-none hover:bg-primary-purple-500 hover:text-white
            dark:bg-primary-purple-500 dark:text-white dark:border-none dark:hover:bg-primary-purple-400 dark:hover:text-white"
        >
          <IoChatbubble className="w-10 h-10 p-[1px]" />
        </button>
      </div>
    </>
  );
}
