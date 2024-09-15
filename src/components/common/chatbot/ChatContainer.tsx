import { IoChatbubble } from "react-icons/io5";
import ChatInput from "./ChatInput";
import ChatLog from "./ChatLog";

export default function ChatContainer() {
  return (
    <section className="flex h-[620px] w-[480px] flex-col justify-between overflow-hidden rounded-3xl bg-white shadow-lg">
      <div className="flex h-[67px] w-full select-none items-center gap-[10px] bg-primary-purple-500 p-6">
        <IoChatbubble className="h-[32px] w-[32px] fill-white" />
        <p className="text-xl font-semibold text-white">플로디텍터 운영자</p>
      </div>
      <ChatLog />
      <div className="p-5">
        <ChatInput />
      </div>
    </section>
  );
}
