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
        "flex h-[200px] w-full flex-col justify-between rounded-xl border border-primary-purple-100 p-5",
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
  return <h4 className="text-text-gray-dark text-[28px]">{children}</h4>;
}

function Desc({ children }: { children: React.ReactNode }) {
  return <span className="text-base text-text-gray-default">{children}</span>;
}

function TextBox({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-[10px]">{children}</div>;
}

LibraryItem.Chip = Chip;
LibraryItem.Title = Title;
LibraryItem.Desc = Desc;
LibraryItem.TextBox = TextBox;
