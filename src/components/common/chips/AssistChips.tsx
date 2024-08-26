import { AssistType } from "@/types/chips";
import { twMerge } from "tailwind-merge";

function AssistChips({
  width,
  height,
  assistType,
  disabled,
  children,
}: {
  width?: string;
  height?: string;
  assistType?: AssistType;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const AssistChipsClasses = {
    outline: disabled
      ? "text-text-gray-default border-text-gray-dark"
      : "text-black border-text-gray-dark dark:border-text-gray-default hover:bg-black dark:text-custom-dark-text hover:bg-opacity-[0.08] focus:bg-opacity-[0.12] active:bg-opacity-[0.12]",
    elevated: disabled
      ? "text-bg-purple-dark border-none bg-bg-purple-light"
      : "text-black bg-bg-purple-light hover:bg-bg-purple-chip border-none hover:bg-opacity-[0.08] focus:bg-opacity-[0.12] active:bg-opacity-[0.12]",
    outlinePrimary: disabled
      ? "text-bg-purple-dark bg-bg-purple-light border-primary-purple-300"
      : "bg-bg-purple-light border-primary-purple-300 text-primary-purple-500 hover:bg-bg-purple-chip hover:bg-opacity-[0.08] focus:bg-opacity-[0.12] focus:border-primary-purple-500 active:bg-opacity-[0.12]",
  };

  return (
    <div
      style={{
        width: width ? `${width}px` : "auto",
        height: height ? `${height}px` : "auto",
      }}
      className={twMerge(
        "flex items-center justify-center whitespace-nowrap rounded-full border px-3 py-2 text-base leading-none",
        assistType && AssistChipsClasses[assistType],
      )}
    >
      {children}
    </div>
  );
}

export default AssistChips;

//드래그 할 때 사용 : shadow-xl
