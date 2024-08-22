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
        "rounded-full border border-text-gray-dark bg-white p-[10px] dark:border-text-gray-light dark:bg-custom-dark-bg",
        className && className,
      )}
      {...rest}
    >
      {icon}
    </button>
  );
}
