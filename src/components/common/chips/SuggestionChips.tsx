import { SuggestionChipsColor } from "@/types/chips";

export default function SuggestionChips({
  width,
  height,
  color,
  children,
}: {
  width?: string;
  height?: string;
  color: SuggestionChipsColor;
  children: React.ReactNode;
}) {
  const chipsTypeClasses = {
    new: `text-white bg-accent-blue`,
    hot: "text-white bg-accent-red",
    warning: "text-accent-red bg-bg-red-light",
    notification: "text-primary-purple-500 bg-primary-purple-50",
    gray: "text-text-gray-default bg-bg-gray-light",
  };

  return (
    <div
      style={{
        width: width ? `${width}px` : "auto",
        height: height ? `${height}px` : "auto",
      }}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-full px-3 py-2 text-base font-semibold ${color ? chipsTypeClasses[color] : ""}`}
    >
      {children}
    </div>
  );
}

//호버,액티브인데 나중에 필요하면 쓸 설려고 빼놓음
//hover:bg-purple-100 hover:cursor-pointer focus:bg-purple-100 active:bg-primary-purple-100 active:shadow-lg shadow-xl
