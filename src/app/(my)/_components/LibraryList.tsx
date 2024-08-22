"use client";

import { twMerge } from "tailwind-merge";
import { usePagination } from "../_hook/usePagination";
import Dropdown from "@/components/common/Dropdown";
import { CaretLeft, CaretRight } from "../../../../public/assets/svg/SvgIcons";
import RoundButton from "./RoundButton";
import { Repository } from "@/types/repository";
import RepositoryItem from "../mylibrary/_components/RepositoryItem";
import LibraryToolbar from "./LibraryToolbar";

const FILES = [
  { label: "label", title: "sfacweb - 1", subtitle: "sub title", id: 1 },
  { label: "label", title: "sfacweb - 2", subtitle: "sub title", id: 2 },
  { label: "label", title: "sfacweb - 3", subtitle: "sub title", id: 3 },
  { label: "label", title: "sfacweb - 4", subtitle: "sub title", id: 4 },
  { label: "label", title: "sfacweb - 5", subtitle: "sub title", id: 5 },
  { label: "label", title: "sfacweb - 6", subtitle: "sub title", id: 6 },
  { label: "label", title: "sfacweb - 7", subtitle: "sub title", id: 7 },
  { label: "label", title: "sfacweb - 8", subtitle: "sub title", id: 8 },
  { label: "label", title: "sfacweb - 9", subtitle: "sub title", id: 9 },
  { label: "label", title: "sfacweb - 10", subtitle: "sub title", id: 10 },
  { label: "label", title: "sfacweb - 11", subtitle: "sub title", id: 11 },
  { label: "label", title: "sfacweb - 12", subtitle: "sub title", id: 12 },
  { label: "label", title: "sfacweb - 13", subtitle: "sub title", id: 13 },
  { label: "label", title: "sfacweb - 14", subtitle: "sub title", id: 14 },
  { label: "label", title: "sfacweb - 15", subtitle: "sub title", id: 15 },
  { label: "label", title: "sfacweb - 16", subtitle: "sub title", id: 16 },
  { label: "label", title: "sfacweb - 17", subtitle: "sub title", id: 17 },
  { label: "label", title: "sfacweb - 18", subtitle: "sub title", id: 18 },
  { label: "label", title: "sfacweb - 19", subtitle: "sub title", id: 19 },
  { label: "label", title: "sfacweb - 20", subtitle: "sub title", id: 20 },
];

export default function LibraryList({
  className,
  type,
  files = FILES,
}: {
  className?: string;
  files?: Repository[];
  type: "REPO" | "DETECTED";
}) {
  const {
    currentItems: currentFiles,
    currentPage,
    totalPages,
    handlePrev,
    handleNext,
  } = usePagination(files);

  return (
    <section className="flex flex-col gap-12">
      <LibraryToolbar />
      <div className="relative h-[696px]">
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
          {currentFiles &&
            currentFiles.map((file) => (
              <li key={file.id}>
                <RepositoryItem {...file} />
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
