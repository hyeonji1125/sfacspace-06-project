type SortButtonProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
  type: "hot" | "new";
};

export default function TagButton({
  label,
  isActive,
  onClick,
  type,
}: SortButtonProps) {
  const activeBgColor = type === "hot" ? "bg-accent-red" : "bg-accent-blue";
  const bgColor = isActive ? activeBgColor : "bg-[#E8E8E8]";
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-base font-semibold rounded-full ${bgColor} ${isActive ? "text-white" : "text-[#ADADAD]"}`}
    >
      {label}
    </button>
  );
}
