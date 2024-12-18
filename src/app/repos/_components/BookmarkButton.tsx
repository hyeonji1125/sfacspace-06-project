"use client";

import { useMemo, useState } from "react";
import { StarFilled, StarLined } from "../../../../public/assets/svg/SvgIcons";
import { twMerge } from "tailwind-merge";
import { postRepo } from "../_utils/fetchRepos";
import { debounce } from "@/utils/debounce";
import { useGetUser } from "@/hooks/useGetUser";

export default function BookmarkButton({
  bookmark,
  name,
}: {
  bookmark: boolean | undefined;
  name: string;
}) {
  const [isBookmarked, setIsBookmarked] = useState<boolean | undefined>(
    bookmark,
  );
  const { email } = useGetUser();

  const debounceUpdateBookmark = useMemo(
    () =>
      debounce(
        async (email: string, name: string, data: { bookmark: boolean }) => {
          await postRepo(email, name, data);
        },
        300,
      ),
    [],
  );

  const handleClickBookmark = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    try {
      if (email) {
        setIsBookmarked((prev) => !prev);
        await debounceUpdateBookmark(email, name, { bookmark: !isBookmarked });
      }
    } catch (error) {
      setIsBookmarked((prev) => prev);
    }
  };

  return (
    <button
      onClick={handleClickBookmark}
      className={twMerge(
        "box-border hidden h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl p-1 group-hover:flex group-hover:border group-hover:border-primary-purple-100 group-hover:bg-white group-hover:dark:bg-opacity-0",
        isBookmarked && "visible flex",
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
