"use client";

import SuggestionChips from "@/components/common/chips/SuggestionChips";
import { SmallPostCardType } from "@/types";
import Link from "next/link";
import {
  PushPinEnabled,
  ShareFatEnabled,
} from "../../../../../public/assets/svg/vulnerabilityDbSvg";

export default function SmallPostCardItem({
  id,
  chips,
  title,
  reportContent,
  date,
}: SmallPostCardType) {
  return (
    <Link href={`/vuldb/items/${id}`}>
      <div className="flex h-[275px] w-[414px] flex-col rounded-lg border border-line-default bg-white p-7 dark:bg-custom-light-bg dark:bg-opacity-5">
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
            {reportContent}
          </p>
        </div>
        <div className="flex w-full justify-between">
          <div className="flex space-x-3">
            <button>
              <PushPinEnabled />
            </button>
            <button>
              <ShareFatEnabled />
            </button>
          </div>
          <p className="text-base font-normal text-[#A2A2A2]">{date}</p>
        </div>
      </div>
    </Link>
  );
}
