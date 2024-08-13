export type SvgState = {
  className?: string;
};

export type DarkModeState = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  toggleDarkMode: () => void;
};

export type DropdownProps = {
  type: 'Type' | 'Sort';
  selectedOption: string;
  onSelect: (option: string) => void;
};
