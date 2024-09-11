import SuggestionChips from "@/components/common/chips/SuggestionChips";
import { SuggestionChipsColor } from "@/types";
import { format } from "date-fns";

type TArticleType = "취약성 경고" | "취약성 알림" | "취약성 보고서" | "기타";

export type TClippingArticle = {
  label: TArticleType;
  title: string;
  c_id: number;
  upload_at: string;
};

function Label({ label }: { label: string }) {
  let type = "" as SuggestionChipsColor;

  switch (label) {
    case "취약성 경고":
      type = "warning";
      break;
    case "취약성 알림":
      type = "notification";
      break;
    case "취약성 보고서":
      type = "report";
      break;
    case "기타":
      type = "gray";
      break;
  }
  return <SuggestionChips color={type}>{label}</SuggestionChips>;
}

export default function ClippingArticle({
  label,
  title,
  upload_at,
}: TClippingArticle) {
  return (
    <div className="flex h-[226px] w-full flex-col justify-between gap-6 rounded-xl border border-line-default p-7 hover:bg-bg-purple-light dark:border-opacity-20 dark:bg-custom-light-bg dark:bg-opacity-0 hover:dark:bg-opacity-5">
      <div className="flex flex-col items-start gap-2">
        <Label label={label} />
        <h4 className="text-overflow h-[72px] text-2xl font-medium leading-normal text-black dark:text-custom-dark-text">
          {title}
        </h4>
      </div>
      <span className="text-base font-normal text-text-gray-default">
        {format(upload_at, "yyyy.MM.dd hh:mm:ss")}
      </span>
    </div>
  );
}
