"use client";

import Button from "@/components/common/Button";
import { Bookmark, RecentFile } from "../../../../public/assets/svg/SvgIcons";
import { RepositoryProps } from "@/types";
import { filterRepos } from "../_utils/filterRepos";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useLibraryStore } from "@/store/useLibraryStore";

type TFilterType = {
  recent: boolean;
  bookmark: boolean;
};

export default function ReposFilterButtons({
  setRepos,
  repositories,
}: {
  setRepos: React.Dispatch<React.SetStateAction<RepositoryProps[]>>;
  repositories: RepositoryProps[];
}) {
  // const [isSelect, setIsSelect] = useState<TFilterType>({
  //   recent: false,
  //   bookmark: false,
  // });
  const { libraryState, setLibraryState } = useLibraryStore();
  const selectStyle =
    "bg-bg-purple-light hover:bg-bg-purple-light focus:bg-bg-purple-light dark:bg-bg-purple-light dark:bg-opacity-10";

  const handleFilterRepos = (e: React.MouseEvent<HTMLButtonElement>) => {
    const type = e.currentTarget.name as keyof TFilterType;
    if (libraryState[type]) {
      setRepos(repositories);
    } else {
      filterRepos(type, setRepos, repositories);
    }
  };

  useEffect(() => {
    return setLibraryState({ recent: false, bookmark: false });
  }, [setLibraryState]);

  return (
    <div className="flex gap-[21px]">
      <Button
        theme="outlined"
        className={twMerge(
          "w-full gap-[10px] border-line-gray-10 p-4 text-xl text-text-gray-dark hover:bg-transparent hover:shadow-sm focus:border-line-gray-10 focus:bg-transparent active:border-line-default dark:border-opacity-20 dark:text-text-gray-light sm:p-4 sm:text-xl md:p-4 md:text-xl",
          libraryState.recent && selectStyle,
        )}
        onClick={(e) => {
          handleFilterRepos(e);
          setLibraryState({
            recent: !libraryState.recent,
            bookmark: false,
          });
        }}
        name="recent"
      >
        <RecentFile color="dark:fill-text-gray-light" /> Recents File
      </Button>
      <Button
        theme="outlined"
        className={twMerge(
          "w-full gap-[10px] border-line-gray-10 p-4 text-xl text-text-gray-dark hover:bg-transparent hover:shadow-sm focus:border-line-gray-10 focus:bg-transparent active:border-line-default dark:border-opacity-20 dark:text-text-gray-light sm:p-4 sm:text-xl md:p-4 md:text-xl",
          libraryState.bookmark && selectStyle,
        )}
        onClick={(e) => {
          handleFilterRepos(e);
          setLibraryState({
            recent: false,
            bookmark: !libraryState.bookmark,
          });
        }}
        name="bookmark"
      >
        <Bookmark color="dark:fill-text-gray-light" /> Bookmark
      </Button>
    </div>
  );
}
