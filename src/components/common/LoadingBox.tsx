import { twMerge } from "tailwind-merge";

export default function LoadingBox({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        "flex w-full animate-pulse flex-col justify-between rounded-xl border border-grayscale-10 p-5 dark:border-opacity-20 dark:bg-custom-light-bg dark:bg-opacity-0",
        className && className,
      )}
    >
      {children}
    </div>
  );
}
