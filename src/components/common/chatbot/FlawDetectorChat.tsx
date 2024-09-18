import { Bug } from "../../../../public/assets/svg/SvgIcons";
import ChatBubble from "./ChatBubble";

export default function FlawDetectorChat({
  children,
  created_at,
  isLoading = false,
}: {
  children?: React.ReactNode;
  created_at?: string;
  isLoading?: boolean;
}) {
  return (
    <div className="flex w-full gap-3">
      <div className="flex h-[52px] w-[52px] items-center justify-center rounded-[18px] bg-primary-purple-500 p-3 dark:bg-primary-purple-300">
        <Bug className="h-full w-full" color="dark:fill-custom-dark-bg" />
      </div>
      <div className="flex flex-col gap-[6px]">
        <span className="select-none text-lg font-medium leading-6 text-[#212122] dark:text-custom-dark-text">
          플로디텍터 운영자
        </span>
        <ChatBubble sender="AI" created_at={created_at}>
          {isLoading ? (
            <div className="flex gap-1 px-1 py-2">
              <div className="h-1 w-1 animate-bounce rounded-full bg-text-gray-default" />
              <div className="h-1 w-1 animate-bounce rounded-full bg-text-gray-default [animation-delay:-.3s]" />
              <div className="h-1 w-1 animate-bounce rounded-full bg-text-gray-default [animation-delay:-.5s]" />
            </div>
          ) : (
            children
          )}
        </ChatBubble>
      </div>
    </div>
  );
}
