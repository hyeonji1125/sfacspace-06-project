import { LibraryState } from "@/types/library";
import { create } from "zustand";

export const useLibraryStore = create<LibraryState>((set) => ({
  libraryState: { recent: false, bookmark: false },
  setLibraryState: (newLibraryState) =>
    set(() => {
      return { libraryState: { ...newLibraryState } };
    }),
}));
