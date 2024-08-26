"use client";

import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { CaretLeft, CaretRight } from "../../../../public/assets/svg/SvgIcons";
import RoundButton from "./RoundButton";
import RepositoryItem from "../mylibrary/_components/RepositoryItem";
import LibraryToolbar from "./LibraryToolbar";
import DetectedFile from "../me/detected-files/_components/DetectedFile";
import { useGithubStore } from '@/store/useGithubStore';
import { usePagination } from "../_hook/usePagination";

export default function LibraryList({
  className,
  type,
}: {
  className?: string;
  type: "REPO" | "DETECTED";
}) {
  const { repositories, fetchRepositories, isLoading, error } = useGithubStore();
  const {
    currentItems: currentRepos,
    currentPage,
    totalPages,
    handlePrev,
    handleNext,
  } = usePagination(repositories);

  useEffect(() => {
    fetchRepositories();
  }, [fetchRepositories]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="flex flex-col gap-12">
      <LibraryToolbar />
      <div className="relative h-auto">
        <div className="absolute left-[50%] top-[50%] flex w-full translate-x-[-50%] translate-y-[-50%] justify-between">
          <RoundButton
            icon={<CaretLeft />}
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="-ml-[27px]"
          />
          <RoundButton
            icon={<CaretRight />}
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="-mr-[27px]"
          />
        </div>
        <ul
          className={twMerge(
            "grid w-full grid-cols-4 gap-x-6 gap-y-12",
            className && className,
          )}
        >
          {currentRepos.map((repo) => (
            <li key={repo.id}>
              {type === "REPO" ? (
                <RepositoryItem
                  id={repo.id}
                  name={repo.name}
                  description={repo.description}
                  visibility={repo.visibility}
                  owner={repo.owner}
                />
              ) : (
                <DetectedFile {...repo} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}