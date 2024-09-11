"use client";

import { useGithubStore } from "@/store/useGithubStore";
import RepositoryItem from "./RepositoryItem";
import { RepositoryProps } from "@/types";
import { useLibraryStore } from "@/store/useLibraryStore";
import { findMatchData } from "../_utils/findMatchData";
import LoadingRepository from "./LoadingRepo";

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
      <p className="w-full pt-20 text-center">
        조건에 해당하는 데이터가 존재하지 않습니다.
      </p>
    );

  return (
    <ul className="grid w-full grid-cols-4 gap-6">
      {currentRepos.length !== 0 &&
        currentRepos.map((repo) => {
          const matchData = findMatchData(repo, reposData);
          return (
            <li key={repo.name}>
              <RepositoryItem {...repo} matchData={matchData} />
            </li>
          );
        })}
    </ul>
  );
}
