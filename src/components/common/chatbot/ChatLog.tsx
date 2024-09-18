"use client";

import { useChatbotStore } from "@/store/useChatbotStore";
import FlawDetectorChat from "./FlawDetectorChat";
import ChatBubble from "./ChatBubble";
import { Fragment, useEffect, useRef } from "react";

export default function ChatLog() {
  const { postDetail, chatLog, isLoading } = useChatbotStore();

  const chatLogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
    }
  }, [chatLog, isLoading]);

  return (
    <div
      ref={chatLogRef}
      className="custom-scrollbar flex h-full flex-col justify-start gap-8 overflow-y-auto overflow-x-hidden px-5 py-6"
    >
      <FlawDetectorChat created_at={Date.now().toString()}>
        <span className="font-semibold">{postDetail.title}</span>
        에서 모르는게 생겼나요?
        <br />
        <br />
        보고서에서 궁금한 점을 물어봐주세요!
      </FlawDetectorChat>
      {chatLog.map((chat) => {
        if (chat.sender === "AI") {
          const lines = chat.message.replace(/\\n/g, "\n").split("\n");
          return (
            <FlawDetectorChat key={chat.id} created_at={chat.created_at}>
              {lines.map((line, index) => (
                <Fragment key={index}>
                  {line}
                  {index < lines.length - 1 && <br />}
                </Fragment>
              ))}
            </FlawDetectorChat>
          );
        } else
          return (
            <ChatBubble
              sender="USER"
              key={chat.id}
              created_at={chat.created_at}
            >
              {chat.message}
            </ChatBubble>
          );
      })}
      {isLoading && <FlawDetectorChat isLoading />}
    </div>
  );
}
