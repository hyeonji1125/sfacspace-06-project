import { twMerge } from "tailwind-merge";

export default function LibraryTitle({ className }: { className?: string }) {
  return (
    <h2
      className={twMerge(
        "flex flex-col items-center gap-5 text-6xl text-primary-purple-500",
        className && className,
      )}
    >
      <p className="font-light">containing code files</p>
      <p className="flex h-[110px] items-center justify-center rounded-full border-4 border-primary-purple-500 px-10 font-normal">
        MY Library
      </p>
    </h2>
  );
}
