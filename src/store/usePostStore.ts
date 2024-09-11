import { crawlingPostData } from "@/lib/postFetcher";
import { PostDataType } from "@/types";
import { create } from "zustand";

type PostState = {
  posts: PostDataType[];
  fetchPosts: () => void; // 게시글 데이터를 불러오는 함수
};

// 스토어 생성
export const usePostStore = create<PostState>((set) => ({
  posts: [],
  fetchPosts: async () => {
    const data = await crawlingPostData();
    set({ posts: data });
  },
}));
