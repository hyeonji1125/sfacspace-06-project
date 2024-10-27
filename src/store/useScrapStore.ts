import { getScrapPosts } from "@/lib/scrapPost";
import { ScrapState } from "@/types/scrap";
import { create } from "zustand";

export const useScrapStore = create<ScrapState>((set) => ({
  status: "IDLE",
  error: null,
  scraps: [],
  ITEMS_PER_PAGE: 12,
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  fetchScraps: async (email) => {
    set({ status: "LOADING", error: null });
    try {
      const articles = await getScrapPosts(email);
      set({ scraps: articles, status: "SUCCESS" });
    } catch (error) {
      set({ error: (error as Error).message, status: "ERROR" });
      throw new Error("Failed to fetch scraps data.");
    }
  },
}));
