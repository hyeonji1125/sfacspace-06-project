"use client";

import { useState } from "react";
import { StarFilled, StarLined } from "../../../../public/assets/svg/SvgIcons";
import { twMerge } from "tailwind-merge";
import { useGithubStore } from "@/store/useGithubStore";
// import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import { debounce } from "@/utils/debounce";

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
  const { setRepositories } = useGithubStore();

  const handleClickBookmark = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsBookmarked((prev) => !prev);

    if (typeof isBookmarked === "undefined") {
      setRepositories(id, true);
    } else {
      setRepositories(id, !isBookmarked);
    }

    // 유저 데이터에 bookmark 배열 추가, 실패시 UI 원상복구
    // const updateBookmark = async () => {
    //   const userRef = doc(db, "users", "foottable@gmail.com");
    //   const user = await getDoc(userRef);
    //   const prevBookmark = (await user?.data()?.bookmark) ?? [];
    //   let currentBookmark = [];

    //   if (!isBookmarked && !prevBookmark.includes(name)) {
    //     currentBookmark = [...prevBookmark, name];
    //     await updateDoc(userRef, { bookmark: currentBookmark });
    //   } else if (isBookmarked && prevBookmark.includes(name)) {
    //     currentBookmark = prevBookmark.filter(
    //       (bookmark: string) => bookmark !== name,
    //     );
    //     await updateDoc(userRef, { bookmark: currentBookmark });
    //   }
    // };
    // const debounceUpdateBookmark = debounce<() => void>(updateBookmark, 2000);
    // debounceUpdateBookmark();
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
