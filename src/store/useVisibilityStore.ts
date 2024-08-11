import { create } from "zustand";

type VisibilityState = {
  topButtonVisible: boolean;
  setTopButtonVisible: (visible: boolean) => void;
};

const useVisibilityStore = create<VisibilityState>((set) => ({
  topButtonVisible: false,
  setTopButtonVisible: (visible) => set({ topButtonVisible: visible }),
}));

export default useVisibilityStore;
