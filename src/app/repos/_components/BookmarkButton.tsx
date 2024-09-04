"use client";

import { useMemo, useState } from "react";
import { StarFilled, StarLined } from "../../../../public/assets/svg/SvgIcons";
import { twMerge } from "tailwind-merge";
import { postRepo } from "../_utils/fetchRepos";
import { useSession } from "next-auth/react";
import { debounce } from "@/utils/debounce";

export default function BookmarkButton({
  bookmark,
  id,
  name,
}: {
  bookmark: boolean | undefined;
  id: number;
  name: string;
}) {
  const [isBookmarked, setIsBookmarked] = useState<boolean | undefined>(
    bookmark,
  );
  // const { setRepositories } = useGithubStore();
  const { data } = useSession();
  const email = data?.user?.email ?? "";

  const debounceUpdateBookmark = useMemo(
    () =>
      debounce(
        async (email: string, name: string, data: { bookmark: boolean }) => {
          await postRepo(email, name, data);
        },
        2000,
      ),
    [],
  );

  const handleClickBookmark = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    try {
      setIsBookmarked((prev) => !prev);
      await debounceUpdateBookmark(email, name, { bookmark: !isBookmarked });
    } catch (error) {
      setIsBookmarked((prev) => prev);
      console.log(error);
    }
  };

  return (
    <button
      onClick={handleClickBookmark}
      className={twMerge(
        "invisible box-border flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl p-1 group-hover:visible group-hover:border group-hover:border-primary-purple-100 group-hover:bg-white group-hover:dark:bg-opacity-0",
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
