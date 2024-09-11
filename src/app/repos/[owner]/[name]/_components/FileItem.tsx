"use client";
import { FaCheck, FaRegFolderOpen, FaStar } from "react-icons/fa6";
import { GoCheckCircleFill, GoFile } from "react-icons/go";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { twMerge } from "tailwind-merge";
import { RepositoryContent } from "@/types";
import { useGithubStore } from "@/store/useGithubStore";
import {
  PiArrowsCounterClockwise,
  PiCaretDown,
  PiCaretRight,
} from "react-icons/pi";
import { FaRegStar } from "react-icons/fa";
import React, { useState } from "react";
import ProgressBar from "@/components/common/ProgressBar";

type FileItemProps = RepositoryContent & {
  status: NonNullable<RepositoryContent["status"]>;
};

export default React.memo(function FileItem({
  name,
  type,
  path,
  status,
  expanded,
}: FileItemProps) {
  const selectedFiles = useGithubStore((state) => state.selectedFiles);
  const [isBookmark, setIsBookmark] = useState(false);

  const statusIcons = {
    inprogress: (
      <PiArrowsCounterClockwise className="text-lg text-primary-purple-500" />
    ),
    pending: (
      <span className="whitespace-nowrap text-sm text-text-gray-default">
        대기중..
      </span>
    ),
    completed: <GoCheckCircleFill className="text-lg text-accent-green" />,
    error: <TbAlertTriangleFilled className="text-lg text-accent-red" />,
    none: null,
  };

  const handleBookmarkClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    setIsBookmark((prev) => !prev);
  };

  return (
    <div
      className={twMerge(
        "group relative flex flex-col gap-1 px-[10px] py-2 text-custom-light-text transition-all duration-200 hover:bg-primary-purple-light dark:bg-transparent dark:text-white",
        selectedFiles.includes(path) && "bg-primary-purple-50 dark:bg-white/20",
      )}
    >
      <div className="flex justify-between">
        <div className="flex w-4/5 items-center gap-1">
          {selectedFiles.includes(path) && (
            <FaCheck className="flex-shrink-0 text-primary-purple-500 dark:text-primary-purple-200" />
          )}
          {type === "dir" ? (
            <div className="flex flex-shrink-0 gap-1 text-lg">
              {expanded ? <PiCaretDown /> : <PiCaretRight />}
              <FaRegFolderOpen />
            </div>
          ) : (
            <GoFile className="flex-shrink-0 text-lg" />
          )}
          <span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {name}
          </span>
        </div>
        {/*기능 구현 후 수정해야 함*/}
        <div className="flex items-center gap-[10px]">
          <button
            type="button"
            title="bookmark"
            className="z-10 text-lg"
            onClick={handleBookmarkClick}
          >
            {isBookmark ? (
              <FaStar className="text-primary-purple-500 dark:text-primary-purple-300" />
            ) : (
              <FaRegStar className="hidden text-primary-purple-100 group-hover:block dark:text-primary-purple-50/30" />
            )}
          </button>
          {statusIcons[status]}
        </div>
      </div>
      {/* <ProgressBar percent={50} className="h-1" /> */}
    </div>
  );
});
