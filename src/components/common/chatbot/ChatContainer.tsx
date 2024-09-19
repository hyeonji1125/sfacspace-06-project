import { IoChatbubble } from "react-icons/io5";
import ChatInput from "./ChatInput";
import ChatLog from "./ChatLog";

export default function ChatContainer() {
  return (
    <section className="ml-5 flex h-[620px] flex-col justify-between overflow-hidden rounded-3xl border border-white bg-white shadow-lg dark:border-primary-purple-300 dark:bg-grayscale-90 sm:ml-0 sm:w-[480px]">
      <div className="flex h-[67px] w-full select-none items-center gap-[10px] bg-primary-purple-500 p-6 dark:bg-primary-purple-300">
        <IoChatbubble className="h-[32px] w-[32px] fill-white dark:fill-custom-dark-bg" />
        <p className="text-xl font-semibold text-white dark:text-custom-dark-bg">
          플로디텍터 운영자
        </p>
      </div>
      <ChatLog />
      <div className="p-5">
        <ChatInput />
      </div>
    </section>
  );
}
