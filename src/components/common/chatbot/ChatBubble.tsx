import { ChatBubbleSender } from "@/types/chatbot";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { twMerge } from "tailwind-merge";

export default function ChatBubble({
  sender,
  created_at,
  children,
}: {
  sender: ChatBubbleSender;
  created_at?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={twMerge(
        "flex w-full items-end gap-2",
        sender === "USER" && "justify-end",
      )}
    >
      <p
        className={twMerge(
          "max-w-[300px] break-words rounded-[20px] px-4 py-3 text-base font-normal",
          sender === "AI"
            ? "order-1 rounded-tl-none bg-[#f7f7f7] text-[#535557] dark:bg-opacity-10 dark:text-grayscale-30"
            : "order-2 rounded-tr-none bg-primary-purple-500 text-white dark:bg-primary-purple-300 dark:text-custom-dark-bg",
        )}
      >
        {children}
      </p>
      <span
        className={twMerge(
          "select-none whitespace-nowrap text-sm font-normal leading-5 -tracking-[0.14px] text-[#8b8f93]",
          sender === "AI" ? "order-2" : "order-1",
        )}
      >
        {created_at
          ? format(new Date(Number(created_at)), "a hh:mm", { locale: ko })
          : null}
      </span>
    </div>
  );
}
