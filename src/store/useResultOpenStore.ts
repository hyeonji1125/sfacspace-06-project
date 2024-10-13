import { create } from "zustand";

type ResultOpenType = {
  resultOpen: boolean;
  setResultOpen: (val: boolean) => void;
};

export const useResultOpenStore = create<ResultOpenType>((set) => ({
  resultOpen: false,
  setResultOpen: (isOpen: boolean) => set({ resultOpen: isOpen }),
}));
