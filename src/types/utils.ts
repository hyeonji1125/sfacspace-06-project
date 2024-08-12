export interface SvgState {
  className?: string;
}

export interface DarkModeState {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;

  toggleDarkMode: () => void;
}
