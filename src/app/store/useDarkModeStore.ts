import { create } from "zustand";
import { DarkModeState } from "../types";

const useDarkModeStore = create<DarkModeState>((set) => ({
  darkMode: localStorage.getItem("darkMode") === "true",
  toggleDarkMode: () =>
    set((state) => {
      const newMode = !state.darkMode;
      localStorage.setItem("darkMode", newMode.toString());
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return { darkMode: newMode };
    }),
  setDarkMode: (value: boolean) =>
    set(() => {
      localStorage.setItem("darkMode", value.toString());
      if (value) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return { darkMode: value };
    }),
}));

export default useDarkModeStore;
