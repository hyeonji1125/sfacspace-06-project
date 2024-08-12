export interface SvgState {
  className?: string;
}

export interface DarkModeState {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;

  toggleDarkMode: () => void;
}
export interface DropdownProps {
  type: 'Type' | 'Sort';
  selectedOption: string;
  onSelect: (option: string) => void;
}
