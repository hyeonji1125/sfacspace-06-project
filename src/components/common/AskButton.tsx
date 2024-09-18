"use client";
import useVisibilityStore from "@/store/useVisibilityStore";
import { useState } from "react";
import { IoChatbubble } from "react-icons/io5";
import { twMerge } from "tailwind-merge";
import ChatContainer from "./chatbot/ChatContainer";

export default function AskButton() {
  const topButtonVisible = useVisibilityStore(
    (state) => state.topButtonVisible,
  );

  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <div
        className={twMerge(
          "fixed right-5 z-20 flex flex-col items-end gap-6 transition-all duration-500 md:right-8",
          topButtonVisible
            ? "bottom-20 sm:bottom-24 md:bottom-32"
            : "bottom-5 md:bottom-8",
        )}
      >
        {isChatOpen && <ChatContainer />}
        <button
          onClick={() => setIsChatOpen((prev) => !prev)}
          className="flex h-12 w-12 items-center justify-center rounded-full border-[1.46px] border-primary-purple-500 bg-white px-3 text-primary-purple-500 shadow-md transition-all duration-200 ease-in-out hover:border-none hover:bg-primary-purple-500 hover:text-white dark:border-none dark:bg-primary-purple-300 dark:text-custom-dark-bg dark:hover:bg-primary-purple-200 sm:h-16 sm:w-16 md:h-[76px] md:w-[76px] md:px-4"
        >
          <IoChatbubble className="h-10 w-10 p-[1px]" />
        </button>
      </div>
    </>
  );
}
