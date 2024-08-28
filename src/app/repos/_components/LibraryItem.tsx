import { twMerge } from "tailwind-merge";
import KebobButton from "./KebobButton";

export default function LibraryItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        "flex h-[200px] w-full flex-col justify-between rounded-xl border border-primary-purple-100 p-5 hover:border-primary-purple-200 dark:border-opacity-20 dark:bg-custom-light-bg dark:bg-opacity-5 hover:dark:border-opacity-40",
        className && className,
      )}
    >
      {children}
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      {children}
      <KebobButton />
    </div>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="max-w-[250px] truncate text-[28px] text-text-gray-dark dark:text-custom-dark-text">
      {children}
    </h4>
  );
}

function Desc({ children }: { children: React.ReactNode }) {
  return (
    <span className="max-w-[250px] truncate text-base text-text-gray-default">
      {children}
    </span>
  );
}

function TextBox({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-[10px]">{children}</div>;
}

LibraryItem.Chip = Chip;
LibraryItem.Title = Title;
LibraryItem.Desc = Desc;
LibraryItem.TextBox = TextBox;
