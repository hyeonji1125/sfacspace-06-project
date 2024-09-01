import { RepositoryStatus } from "@/types";
import { twMerge } from "tailwind-merge";

export default function RepositoryChip({ type }: { type?: RepositoryStatus }) {
  let style;
  let message;

  switch (type) {
    case "COMPLETED":
      style =
        "text-primary-purple-500 bg-primary-purple-50 dark:border-primary-purple-300 dark:text-primary-purple-300";
      message = "검사완료";
      break;
    case "IN_PROGRESS":
      style =
        "text-text-gray-default bg-bg-gray-light dark:border-text-gray-default dark:text-text-gray-default";
      message = "검사중";
      break;
    default:
      style = "invisible";
      message = "";
  }

  return (
    <div
      className={twMerge(
        "flex w-auto items-center justify-center rounded-full px-3 py-2 text-base font-medium tracking-tight dark:border dark:bg-transparent",
        style,
      )}
    >
      {message}
    </div>
  );
}
