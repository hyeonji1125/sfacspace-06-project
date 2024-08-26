import { twMerge } from "tailwind-merge";

type TRoundButtonProps = {
  icon: React.ReactNode;
} & React.ComponentPropsWithoutRef<"button">;

export default function RoundButton({
  icon,
  className,
  ...rest
}: TRoundButtonProps) {
  return (
    <button
      className={twMerge(
        "rounded-full border border-text-gray-dark bg-white p-[10px] hover:bg-bg-gray-light disabled:hidden dark:border-text-gray-light dark:border-opacity-50 dark:bg-custom-dark-bg dark:hover:border-opacity-80 dark:hover:bg-grayscale-80",
        className && className,
      )}
      {...rest}
    >
      {icon}
    </button>
  );
}
