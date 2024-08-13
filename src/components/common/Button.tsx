import { TButtonProps } from "@/types";
import { twMerge } from "tailwind-merge";

export default function Button({
  theme,
  size,
  isRound,
  disabled,
  children,
  ...rest
}: TButtonProps) {
  const themes = {
    filled:
      "bg-primary-purple-500 text-white disabled:bg-bg-gray-light disabled:text-text-gray-default dark:disabled:bg-bg-gray-dark",
    outlined:
      "bg-white text-primary-purple-500 border border-primary-purple-200 hover:bg-primary-purple-500/10 focus:bg-primary-purple-500/15 focus:border-primary-purple-500 active:border-primary-purple-200 disabled:text-text-gray-default disabled:hover:bg-white disabled:border-line-default dark:bg-custom-dark-bg dark:hover:brightness-150 dark:disabled:hover:bg-custom-dark-bg dark:disabled:hover:brightness-100",
    tonal:
      "bg-primary-purple-50 text-primary-purple-500 hover:brightness-[0.92] focus:brightness-[0.88] active:brightness-[0.88] disabled:text-primary-purple-100 disabled:bg-bg-purple-light disabled:brightness-100 dark:bg-primary-purple-200",
  };

  const sizes = {
    middle: "px-6 font-light",
    small: "px-5 py-2 text-xl font-light",
  };

  return (
    <button
      className={twMerge(
        "flex h-14 items-center justify-center rounded-lg px-14 py-4 text-2xl font-semibold hover:shadow-lg disabled:hover:shadow-none",
        themes[theme],
        size && sizes[size],
        isRound && "rounded-full",
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
}
