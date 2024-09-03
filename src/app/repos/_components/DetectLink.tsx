import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { Bug, CaretRight } from "../../../../public/assets/svg/SvgIcons";

export default function DetectLink({
  status,
  id,
}: {
  status?: "COMPLETED" | "IN_PROGRESS" | undefined;
  id: number;
}) {
  let style;
  switch (status) {
    case "COMPLETED":
      style = "bg-grayscale-100";
      break;
    default:
      style = "bg-primary-purple-500";
      break;
  }

  return (
    <Link
      href={
        status === "COMPLETED" ? `/repos/${id}` : `/repos/${id}/inspection}`
      }
    >
      <div
        className={twMerge(
          "flex items-center gap-[7px] whitespace-nowrap rounded-[14px] p-[10px] text-white",
          style,
        )}
      >
        <Bug />
        {status === "COMPLETED" ? "결과보기" : "검사하기"}
        <CaretRight className="h-5 w-5" color="fill-white" />
      </div>
    </Link>
  );
}
