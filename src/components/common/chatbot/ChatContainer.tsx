import { IoChatbubble } from "react-icons/io5";

export default function ChatContainer() {
  return (
    <section className="flex h-[726px] w-[558px] flex-col justify-between overflow-hidden rounded-3xl bg-white shadow-lg">
      <div className="flex h-[67px] w-full items-center gap-[10px] bg-primary-purple-500 p-6">
        <IoChatbubble className="h-[34px] w-[34px] fill-white" />
        <p className="text-xl font-semibold text-white">플로디텍터 운영자</p>
      </div>
      <div className="flex flex-col">채팅내용</div>
      <div className="p-5">
        <input placeholder="챗봇에게 궁금한 점을 물어보세요!" />
      </div>
    </section>
  );
}
