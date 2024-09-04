import { create } from "zustand";
import { VisibilityState } from "@/types";

const useVisibilityStore = create<VisibilityState>((set) => ({
  topButtonVisible: false,
  setTopButtonVisible: (visible) => set({ topButtonVisible: visible }),
}));

export default useVisibilityStore;
