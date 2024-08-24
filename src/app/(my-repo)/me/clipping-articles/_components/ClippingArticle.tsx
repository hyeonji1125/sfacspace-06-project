import SuggestionChips from "@/components/common/chips/SuggestionChips";
import { SuggestionChipsColor } from "@/types";

export type TClippingArticle = {
  type: SuggestionChipsColor;
  title: string;
  date: string;
  id: number;
};

function Label({ type }: { type: SuggestionChipsColor }) {
  let labelText = "";

  switch (type) {
    case "warning":
      labelText = "취약성 경고";
      break;
    case "notification":
      labelText = "취약성 알림";
      break;
    case "gray":
      labelText = "취약성 보고서";
      break;
    default:
      labelText = "error";
      break;
  }
  return <SuggestionChips color={type}>{labelText}</SuggestionChips>;
}

export default function ClippingArticle({
  type,
  title,
  date,
}: TClippingArticle) {
  return (
    <div className="flex h-auto w-full flex-col justify-between gap-6 rounded-xl border border-line-default p-7 dark:border-opacity-20 dark:bg-custom-light-bg dark:bg-opacity-10">
      <div className="flex flex-col items-start gap-2">
        <Label type={type} />
        <h4 className="text-overflow text-2xl font-medium leading-normal text-black dark:text-custom-dark-text">
          {title}
        </h4>
      </div>
      <span className="text-base font-normal text-text-gray-default">
        {date}
      </span>
    </div>
  );
}
