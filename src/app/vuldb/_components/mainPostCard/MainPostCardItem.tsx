"use client";

import SuggestionChips from "@/components/common/chips/SuggestionChips";
import { MainPostCardType } from "@/types";
import Link from "next/link";
import {
  PushPinEnabled,
  ShareFatEnabled,
} from "../../../../../public/assets/svg/vulnerabilityDbSvg";

export default function MainPostCardItem({
  id,
  chips,
  title,
  company,
  reportContent,
  date,
}: MainPostCardType) {
  return (
    <Link href={`/vulnerability-db/${id}`}>
      <div className="flex h-[253px] w-[865px] flex-col rounded-lg border border-line-default bg-white p-7">
        <div className="flex items-center gap-2 pb-1">
          {(chips === "new" || chips === "hot") && (
            <SuggestionChips width="59" height="35" color={chips}>
              {chips.toUpperCase()}
            </SuggestionChips>
          )}
          <h1 className="text-xl font-normal">{title}</h1>
        </div>
        <span className="pb-5 text-base font-normal text-[#ADADAD]">
          {company}
        </span>
        <div className="flex h-[59px] w-[809px] items-center rounded-2xl bg-bg-purple-light px-5">
          <p className="max-w-3xl truncate text-base font-normal text-[#797979]">
            {reportContent}
          </p>
        </div>
        <div className="flex w-full justify-between pt-6">
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