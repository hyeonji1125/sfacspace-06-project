import { create } from "zustand";

type BookmarkStore = {
  selectedFiles: string[];
  bookmarks: { [key: string]: boolean }; // path를 키로 하는 북마크 상태
  addBookmark: (path: string) => void;
  removeBookmark: (path: string) => void;
};

export const useBookmarkStore = create<BookmarkStore>((set) => ({
  selectedFiles: [],
  bookmarks: {},
  addBookmark: (path) =>
    set((state) => ({
      bookmarks: { ...state.bookmarks, [path]: true },
    })),
  removeBookmark: (path) =>
    set((state) => ({
      bookmarks: { ...state.bookmarks, [path]: false },
    })),
}));
