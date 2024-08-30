import { PaginationState } from "@/types";
import { create } from "zustand";

const usePaginationStore = create<PaginationState>((set) => ({
  currentPage: 1,
  itemsPerPage: 5,
  setCurrentPage: (page) => set({ currentPage: page }),
}));

export default usePaginationStore;