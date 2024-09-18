"use client";

import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { ArrowBottom } from "../../../../public/assets/svg/SvgIcons";
import { useChatbotStore } from "@/store/useChatbotStore";
import { ChatMessage } from "@/types/chatbot";

export default function ChatInput() {
  const [question, setQuestion] = useState("");
  const { addMessage, postDetail, fetchAIChatbot, isLoading } =
    useChatbotStore();

  const handleChangeInputValue = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { value } = e.target;
    setQuestion(value);
  };

  const handleSubmitQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) return;

    const userMessage: ChatMessage = {
      sender: "USER",
      message: question,
      created_at: Date.now().toString(),
      id: Date.now().toString(),
    };

    addMessage(userMessage);
    setQuestion("");
    const response = await fetchAIChatbot(question, postDetail.content);
    addMessage(response);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.form;

      if (form) {
        form.requestSubmit();
      }
    }
  };

  return (
    <form
      className="flex max-h-[140px] w-full max-w-[518px] items-center gap-[10px] rounded-[24px] bg-[#f8f8f9] px-4 py-[10px]"
      onSubmit={handleSubmitQuestion}
    >
      <TextareaAutosize
        placeholder="챗봇에게 궁금한 점을 물어보세요!"
        required
        onChange={handleChangeInputValue}
        onKeyDown={handleKeyDown}
        value={question}
        minRows={1}
        cacheMeasurements
        className="custom-scrollbar h-auto max-h-[112px] w-full flex-grow resize-none bg-transparent px-1 py-2 text-base text-text-gray-dark placeholder-grayscale-30 outline-none"
      />
      <button
        type="submit"
        className="flex h-[36px] w-[46px] items-center justify-center rounded-[34px] bg-primary-purple-500 px-[14px] py-[10px] disabled:bg-grayscale-50"
        disabled={isLoading}
      >
        <ArrowBottom />
      </button>
    </form>
  );
}
