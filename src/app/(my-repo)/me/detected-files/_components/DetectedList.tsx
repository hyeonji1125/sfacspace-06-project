"use client";

import { twMerge } from "tailwind-merge";
import { usePagination } from "@/app/(my-repo)/_hook/usePagination";
import LibraryToolbar from "@/app/(my-repo)/_components/LibraryToolbar";
import DetectedFile from "./DetectedFile";
import RoundButton from "@/app/(my-repo)/_components/RoundButton";
import {
  CaretLeft,
  CaretRight,
} from "../../../../../../public/assets/svg/SvgIcons";
import { DETECTED_FILES } from "../mock/detectedFiles";

/**
 * @todo
 * - Firestore에서 데이터 가져오는 로직 추가
 * - pagination에 해당 데이터 삽입
 * */
export default function DetectedList({ className }: { className?: string }) {
  const {
    currentItems: currentRepos,
    currentPage,
    totalPages,
    handlePrev,
    handleNext,
  } = usePagination(DETECTED_FILES);

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  return (
    <section className="flex w-full flex-col gap-12">
      <LibraryToolbar />
      <div className="relative h-auto">
        <ul
          className={twMerge(
            "grid w-full grid-cols-4 grid-rows-3 gap-x-6 gap-y-12",
            className && className,
          )}
        >
          {currentRepos.map((repo) => (
            <li key={repo.id}>
              <DetectedFile {...repo} />
            </li>
          ))}
        </ul>
        <RoundButton
          icon={<CaretLeft className="dark:fill-text-gray-light" />}
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="absolute left-0 top-[50%] -ml-[27px] translate-y-[-50%]"
        />
        <RoundButton
          icon={<CaretRight className="dark:fill-text-gray-light" />}
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="absolute right-0 top-[50%] -mr-[27px] translate-y-[-50%]"
        />
      </div>
    </section>
  );
}
