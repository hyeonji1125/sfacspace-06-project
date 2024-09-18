import { ChatbotState, ChatMessage } from "@/types/chatbot";
import { create } from "zustand";

const AI_ERROR_MESSAGE: ChatMessage = {
  sender: "AI",
  message: "답변 도중 에러가 발생했어요!\\n 다시 한 번 시도해주세요.",
  created_at: Date.now().toString(),
  id: Date.now().toString(),
};

export const useChatbotStore = create<ChatbotState>((set) => ({
  postDetail: { title: "", content: "" },
  isLoading: false,
  chatLog: [],
  setPostDetail: (post) => {
    set({ postDetail: { title: post.title, content: post.report_content } });
  },
  clearChatLog: () => {
    set({ chatLog: [] });
  },
  fetchAIChatbot: async (question, post) => {
    try {
      set({ isLoading: true });
      const result = await fetch("/api/ai-chat", {
        method: "POST",
        body: JSON.stringify({
          question,
          post,
          temperature: 0.8,
          top_p: 0.9,
        }),
      });
      const { response } = await result.json();

      return response;
    } catch (error) {
      set((state) => ({ chatLog: [...state.chatLog, AI_ERROR_MESSAGE] }));
      throw new Error("Failed to fetch AI response.");
    } finally {
      set({ isLoading: false });
    }
  },
  addMessage: (message) => {
    set((state) => ({
      chatLog: [...state.chatLog, message],
    }));
  },
  setLoading: (loading) => {
    set(() => ({ isLoading: loading }));
  },
}));
