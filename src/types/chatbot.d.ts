import { PostDataType } from "./postDataType";

export type ChatBubbleSender = "AI" | "USER";

export type PostDetail = {
  title: string;
  content: string;
};

type ChatMessage = {
  id: string;
  sender: ChatBubbleSender;
  message: string;
  created_at: string;
  isRelevant?: boolean;
};

type ChatbotState = {
  postDetail: PostDetail;
  isLoading: boolean;
  chatLog: ChatMessage[];
  setPostDetail: (post: PostDataType) => void;
  clearChatLog: () => void;
  fetchAIChatbot: (question: string, post: string) => Promise<ChatMessage>;
  addMessage: (message: ChatMessage) => void;
  setLoading: (loading: boolean) => void;
};
