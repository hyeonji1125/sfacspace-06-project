"use client";

import { useEffect, useState } from "react";
import { useGithubStore } from "@/store/useGithubStore";
import Pagination from "@/app/vuldb/_components/Pagination";
import usePaginationStore from "@/store/usePaginationStore";
import { RepositoryProps } from "@/types";
import ReposToolbar from "./ReposToolbar";
import { useLibraryStore } from "@/store/useLibraryStore";
import { useGetUser } from "@/hooks/useGetUser";
import RepositoryList from "./RepositoryList";

export default function ReposLibrary() {
  const [repos, setRepos] = useState<RepositoryProps[]>([]);
  const [currentPageRepos, setCurrentPageRepos] = useState<RepositoryProps[]>(
    [],
  );
  const { repositories, fetchRepositories } = useGithubStore();
  const { fetchReposData, currentPage, setCurrentPage, ITEMS_PER_PAGE } =
    useLibraryStore();
  const { reposItemsPerPage } = usePaginationStore();
  const { email } = useGetUser();

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

  return (
    <section className="flex w-full flex-col gap-6">
      <ReposToolbar setRepos={setRepos} repositories={repositories} />
      <RepositoryList currentRepos={currentPageRepos} />
      <Pagination
        totalItems={repos.length}
        setCurrent={setCurrentPage}
        current={currentPage}
        numberPerPage={reposItemsPerPage}
      />
    </section>
  );
}
