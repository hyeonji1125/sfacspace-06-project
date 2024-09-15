import { getScrapPosts } from "@/lib/scrapPost";
import { ScrapState } from "@/types/scrap";
import { create } from "zustand";

export const useScrapStore = create<ScrapState>((set) => ({
  isLoading: false,
  error: null,
  scraps: [],
  ITEMS_PER_PAGE: 12,
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  fetchScraps: async (email) => {
    set({ isLoading: true, error: null });
    try {
      const articles = await getScrapPosts(email);
      set({ scraps: articles, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
      throw new Error("Failed to fetch scraps data.");
    }
  },
}));
