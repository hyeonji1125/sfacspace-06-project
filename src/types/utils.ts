export type SvgState = {
  className?: string;
  fill?: string;
};

export type DarkModeState = {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
  toggleDarkMode: () => void;
};

export type DropdownProps = {
  type: "Type" | "Sort";
  selectedOption: string;
  onSelect: (option: string) => void;
};

export type DropdownState = {
  selectedType: string;
  setSelectedType: (option: string) => void;
  selectedSort: string;
  setSelectedSort: (option: string) => void;
};

export type VisibilityState = {
  topButtonVisible: boolean;
  setTopButtonVisible: (visible: boolean) => void;
};

export type TButtonProps = {
  theme: "filled" | "outlined" | "tonal";
  size?: "large" | "middle" | "small";
  isRound?: boolean;
} & React.ComponentPropsWithoutRef<"button">;
