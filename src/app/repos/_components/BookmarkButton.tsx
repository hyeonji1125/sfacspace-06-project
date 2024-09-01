"use client";

import { useState } from "react";
import { StarFilled, StarLined } from "../../../../public/assets/svg/SvgIcons";
import { twMerge } from "tailwind-merge";
import { useGithubStore } from "@/store/useGithubStore";

export default function BookmarkButton({
  bookmark,
  id,
}: {
  bookmark: boolean | undefined;
  id: number;
}) {
  const [isBookmarked, setIsBookmarked] = useState<boolean | undefined>(
    bookmark,
  );
  const { setRepositories } = useGithubStore();

  const handleClickBookmark = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsBookmarked((prev) => !prev);
    // 유저 데이터에 isBookmarked 추가, 실패시 UI 원상복구
    if (typeof isBookmarked === "undefined") {
      setRepositories(id, true);
    } else {
      setRepositories(id, !isBookmarked);
    }
  };

  return (
    <button
      onClick={handleClickBookmark}
      className={twMerge(
        "invisible box-border flex h-12 w-12 items-center justify-center rounded-xl p-1 group-hover:visible group-hover:border group-hover:border-primary-purple-100 group-hover:bg-white group-hover:dark:bg-opacity-0",
        isBookmarked && "visible",
      )}
    >
      {isBookmarked ? (
        <StarFilled className="h-8 w-8" />
      ) : (
        <StarLined className="h-8 w-8" />
      )}
    </button>
  );
}
