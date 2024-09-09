"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useGithubStore } from "@/store/useGithubStore";
import RepositoryItem from "./RepositoryItem";
import Pagination from "@/app/vuldb/_components/Pagination";
import usePaginationStore from "@/store/usePaginationStore";
import { RepositoryProps } from "@/types";
import ReposToolbar from "./ReposToolbar";
import { useLibraryStore } from "@/store/useLibraryStore";
import { useGetUser } from "@/hooks/useGetUser";

export default function RepositoryList({ className }: { className?: string }) {
  const [repos, setRepos] = useState<RepositoryProps[]>([]);
  const [currentPageRepos, setCurrentPageRepos] = useState<RepositoryProps[]>(
    [],
  );
  const { repositories, fetchRepositories, isLoading, error } =
    useGithubStore();
  const {
    status,
    reposData,
    fetchReposData,
    currentPage,
    setCurrentPage,
    ITEMS_PER_PAGE,
  } = useLibraryStore();
  const { reposItemsPerPage } = usePaginationStore();
  const { email } = useGetUser();

  const findMatchData = (name: string) =>
    reposData.find((repo) => repo.id === name);

  useEffect(() => {
    if (email) {
      fetchReposData(email);
    }
  }, [email, fetchReposData]);

  useEffect(() => {
    fetchRepositories();
  }, [fetchRepositories]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setCurrentPageRepos(repos.slice(startIndex, endIndex));
  }, [repos, currentPage, ITEMS_PER_PAGE]);

  useEffect(() => {
    return setCurrentPage(1);
  }, [setCurrentPage]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="flex w-full flex-col gap-6">
      <ReposToolbar setRepos={setRepos} repositories={repositories} />
      {repos.length === 0 && (
        <p className="w-full pt-20 text-center">
          조건에 해당하는 데이터가 존재하지 않습니다.
        </p>
      )}
      <ul
        className={twMerge(
          "grid w-full grid-cols-4 gap-6",
          className && className,
        )}
      >
        {currentPageRepos.map((repo) => {
          const matchData = findMatchData(repo.name);
          return (
            <li key={repo.name}>
              <RepositoryItem {...repo} matchData={matchData} />
            </li>
          );
        })}
      </ul>
      <Pagination
        totalItems={repos.length}
        setCurrent={setCurrentPage}
        current={currentPage}
        numberPerPage={reposItemsPerPage}
      />
    </section>
  );
}
