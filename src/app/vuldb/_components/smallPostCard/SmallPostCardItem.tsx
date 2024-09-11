import SuggestionChips from "@/components/common/chips/SuggestionChips";
import { PostDataType } from "@/types";
import Link from "next/link";
import PinButton from "../button/PinButton";
import ShareButton from "../button/ShareButton";

export default function SmallPostCardItem({
  id,
  chips,
  title,
  report_content,
  upload_at,
}: PostDataType) {
  return (
    <div className="flex h-[275px] w-[414px] cursor-pointer flex-col justify-center rounded-lg border border-line-default bg-white p-7 dark:bg-custom-light-bg dark:bg-opacity-5">
      <Link href={`/vuldb/items/${id}`}>
        {(chips === "new" || chips === "hot") && (
          <SuggestionChips width="59" height="35" color={chips}>
            {chips.toUpperCase()}
          </SuggestionChips>
        )}
        <div className="w-auto">
          <h1 className="line-clamp-2 pt-2 text-2xl font-medium leading-9">
            {title}
          </h1>
        </div>
        <div>
          <p className="truncate py-6 text-lg font-normal text-[#969696]">
            {report_content}
          </p>
        </div>
      </Link>
      <div className="flex w-full justify-between">
        <div className="flex space-x-3">
          <PinButton postId={id} />
          <ShareButton postId={id} />
        </div>
        <p className="text-base font-normal text-[#A2A2A2]">{upload_at}</p>
      </div>
    </div>
  );
}
