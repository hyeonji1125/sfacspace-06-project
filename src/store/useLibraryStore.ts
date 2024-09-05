import { getReposData } from "@/app/repos/_utils/fetchRepos";
import { LibraryState } from "@/types/library";
import { create } from "zustand";

export const useLibraryStore = create<LibraryState>((set, get) => ({
  status: { isLoading: false, error: null },
  libraryState: { recent: false, bookmark: false },
  reposData: [],
  setLibraryState: (newLibraryState) =>
    set((state) => {
      return { libraryState: { ...state, ...newLibraryState } };
    }),
  fetchReposData: async (email) => {
    set({
      status: { isLoading: true, error: null },
    });
    try {
      const repos = await getReposData(email);
      console.log("store: ", repos);
      set({ reposData: repos, status: { isLoading: false, error: null } });
    } catch (error) {
      set({
        status: { isLoading: false, error: (error as Error).message },
      });
    }
  },
  setReposData: (data) => set({ reposData: data }),
}));
