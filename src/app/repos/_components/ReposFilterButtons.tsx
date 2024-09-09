"use client";

import { useEffect } from "react";
import { useGetUser } from "@/hooks/useGetUser";
import { useLibraryStore } from "@/store/useLibraryStore";
import { twMerge } from "tailwind-merge";
import { filterRepos } from "../_utils/filterRepos";
import { RepositoryProps } from "@/types";
import Button from "@/components/common/Button";
import { Bookmark, RecentFile } from "../../../../public/assets/svg/SvgIcons";
import { FilterType } from "@/types/library";

const REPO_FILTER_BUTTONS: Array<{
  name: keyof FilterType;
  label: string;
  icon: JSX.Element;
}> = [
  {
    name: "recent",
    label: "Recents File",
    icon: <RecentFile color="dark:fill-text-gray-light" />,
  },
  {
    name: "bookmark",
    label: "Bookmark",
    icon: <Bookmark color="dark:fill-text-gray-light" />,
  },
];

export default function ReposFilterButtons({
  setRepos,
  repositories,
}: {
  setRepos: React.Dispatch<React.SetStateAction<RepositoryProps[]>>;
  repositories: RepositoryProps[];
}) {
  const { email } = useGetUser();
  const { libraryState, reposData, setLibraryState, fetchReposData } =
    useLibraryStore();
  const selectStyle =
    "bg-bg-purple-light hover:bg-bg-purple-light focus:bg-bg-purple-light dark:bg-bg-purple-light dark:bg-opacity-10";

  const handleFilterRepos = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const type = e.currentTarget.name as keyof FilterType;
    if (libraryState[type]) {
      setRepos(repositories);
    } else if (email) {
      fetchReposData(email);
      filterRepos(type, setRepos, repositories, reposData);
    }
  };

  useEffect(() => {
    return setLibraryState({ recent: false, bookmark: false });
  }, [setLibraryState]);

  return (
    <div className="flex gap-[21px]">
      {REPO_FILTER_BUTTONS.map((button) => (
        <Button
          key={button.label}
          theme="outlined"
          className={twMerge(
            "w-full gap-[10px] border-line-gray-10 p-4 text-xl text-text-gray-dark hover:bg-transparent hover:shadow-sm focus:border-line-gray-10 focus:bg-transparent active:border-line-default dark:border-opacity-20 dark:text-text-gray-light sm:p-4 sm:text-xl md:p-4 md:text-xl",
            libraryState[button.name] && selectStyle,
          )}
          onClick={(e) => {
            handleFilterRepos(e);
            setLibraryState({
              recent: button.name === "recent" ? !libraryState.recent : false,
              bookmark:
                button.name === "bookmark" ? !libraryState.bookmark : false,
            });
          }}
          name={button.name}
        >
          {button.icon} {button.label}
        </Button>
      ))}
    </div>
  );
}
