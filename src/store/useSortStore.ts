import { SortState } from "@/types";
import { create } from "zustand";

export const useSortStore = create<SortState>((set) => ({
  sortType: "hot", // 초기값 설정
  setSortType: (type) => set({ sortType: type }),
}));
