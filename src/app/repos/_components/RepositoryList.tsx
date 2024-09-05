"use client";

import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useGithubStore } from "@/store/useGithubStore";
import RepositoryItem from "./RepositoryItem";
import Pagination from "@/app/vuldb/_components/Pagination";
import usePaginationStore from "@/store/usePaginationStore";
import { RepositoryProps } from "@/types";
import ReposToolbar from "./ReposToolbar";
import { useSession } from "next-auth/react";
import { useLibraryStore } from "@/store/useLibraryStore";

export default function RepositoryList({ className }: { className?: string }) {
  const [repos, setRepos] = useState<RepositoryProps[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentPageRepos, setCurrentPageRepos] = useState<RepositoryProps[]>(
    [],
  );
  const { repositories, fetchRepositories, isLoading, error } =
    useGithubStore();
  const { status, reposData, fetchReposData } = useLibraryStore();
  const { reposItemsPerPage } = usePaginationStore();
  const { data } = useSession();
  const email = data?.user?.email ?? "";

  const findMatchData = (name: string) =>
    reposData.find((repo) => repo.id === name);

  useEffect(() => {
    if (email) {
      fetchReposData(email);
    }
  }, [email]);

  useEffect(() => {
    fetchRepositories();
  }, [fetchRepositories]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * reposItemsPerPage;
    const endIndex = startIndex + reposItemsPerPage;
    setCurrentPageRepos(repos.slice(startIndex, endIndex));
  }, [repos, currentPage, reposItemsPerPage]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="flex w-full flex-col gap-6">
      <ReposToolbar setRepos={setRepos} repositories={repositories} />
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
        {repos.length === 0 && (
          <p>조건에 해당하는 데이터가 존재하지 않습니다.</p>
        )}
      </ul>
      <Pagination
        totalItems={repos.length}
        type="REPOS"
        setCurrent={setCurrentPage}
        current={currentPage}
        numberPerPage={reposItemsPerPage}
      />
    </section>
  );
}
