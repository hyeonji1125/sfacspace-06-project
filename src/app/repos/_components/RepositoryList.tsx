"use client";

import { useGithubStore } from "@/store/useGithubStore";
import RepositoryItem from "./RepositoryItem";
import { RepositoryProps } from "@/types";
import { useLibraryStore } from "@/store/useLibraryStore";
import { findMatchData } from "../_utils/findMatchData";
import LoadingRepository from "./LoadingRepo";
import EmptyContent from "@/components/common/EmptyContent";
import { MdOutlineFolderOff } from "react-icons/md";

export default function RepositoryList({
  currentRepos,
}: {
  currentRepos: RepositoryProps[];
}) {
  const { isLoading, error } = useGithubStore();
  const { reposData } = useLibraryStore();

  if (isLoading) return <LoadingRepository />;
  if (error) return <div>{error}</div>;
  if (currentRepos.length === 0)
    return (
      <EmptyContent
        icon={
          <MdOutlineFolderOff className="h-16 w-16 text-text-gray-light dark:text-text-gray-dark" />
        }
      >
        조건에 해당하는 데이터가 없어요.
      </EmptyContent>
    );

  return (
    <ul className="grid w-full grid-cols-4 gap-6">
      {currentRepos.length !== 0 &&
        currentRepos.map((repo, index) => {
          const matchData = findMatchData(repo, reposData);
          return (
            <li key={`${repo.id || repo.name}-${index}`}>
              <RepositoryItem {...repo} matchData={matchData} />
            </li>
          );
        })}
    </ul>
  );
}
