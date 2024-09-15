import { ChatbotState } from "@/types/chatbot";
import { create } from "zustand";

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
