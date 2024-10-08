"use client";

import SuggestionChips from "@/components/common/chips/SuggestionChips";
import { PostDataType } from "@/types";
import Link from "next/link";
import PinButton from "../button/PinButton";
import ShareButton from "../button/ShareButton";

export default function MainPostCardItem({
  id,
  chips,
  title,
  site_name,
  report_content,
  upload_at,
}: PostDataType) {
  return (
    <div className="relative flex h-[253px] w-[865px] flex-col rounded-lg border border-line-default bg-white p-7 dark:bg-custom-light-bg dark:bg-opacity-5">
      <div className="flex items-center gap-2 pb-1">
        {(chips === "new" || chips === "hot") && (
          <SuggestionChips width="59" height="35" color={chips}>
            {chips.toUpperCase()}
          </SuggestionChips>
        )}
        <h1 className="text-xl font-normal">{title}</h1>
      </div>
      <span className="pb-5 text-base font-normal text-[#ADADAD]">
        {site_name}
      </span>
      <div className="flex h-[59px] w-[809px] items-center rounded-2xl bg-bg-purple-light px-5 dark:bg-custom-light-bg dark:bg-opacity-20">
        <p className="max-w-3xl truncate text-base font-normal text-[#797979] dark:text-custom-dark-text">
          {report_content}
        </p>
      </div>
      <div className="flex w-full justify-between pt-6">
        <div className="z-10 flex space-x-3">
          <PinButton postId={id} />
          <ShareButton postId={id} />
        </div>
        <p className="text-base font-normal text-[#A2A2A2]">{upload_at}</p>
      </div>
      <Link href={`/vuldb/items/${id}`}>
        <div className="absolute inset-0 z-0"></div>
      </Link>
    </div>
  );
}
