import { twMerge } from "tailwind-merge";

export default function LibraryTitle({
  className,
  type,
}: {
  className?: string;
  type: "LOGIN" | "LIBRARY";
}) {
  return (
    <h2
      className={twMerge(
        "flex flex-col items-center justify-center gap-5 text-center text-6xl text-primary-purple-500",
        className && className,
      )}
    >
      <p className="font-light">containing code files</p>
      <p
        className={twMerge(
          "flex h-[110px] items-center justify-center rounded-full border-4 border-primary-purple-500 bg-white px-10 font-normal dark:bg-custom-dark-bg",
          type === "LOGIN" && "dark:border-custom-dark-text",
        )}
      >
        MY Library
      </p>
    </h2>
  );
}
