"use client";
import {
  addBookmark,
  fetchBookmarks,
  removeBookmark,
} from "@/app/repos/_utils/bookmark";
import { useGetUser } from "@/hooks/useGetUser";
import { useGithubStore } from "@/store/useGithubStore";
import { RepositoryContent } from "@/types";
import React, { useEffect, useState } from "react";
import { FaRegStar } from "react-icons/fa";
import { FaCheck, FaRegFolderOpen, FaStar } from "react-icons/fa6";
import { GoCheckCircleFill, GoFile } from "react-icons/go";
import {
  PiArrowsCounterClockwise,
  PiCaretDown,
  PiCaretRight,
} from "react-icons/pi";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { twMerge } from "tailwind-merge";
import { useRepoParams } from "../_utils/useRepoParams";

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
  const { email } = useGetUser();
  const { name: repoName } = useRepoParams(); // 훅을 최상단에서 호출

  const handleBookmarkClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.stopPropagation();

    try {
      if (!email) throw new Error("로그인된 사용자 이메일이 없습니다.");
      if (!repoName) throw new Error("리포지토리 이름이 없습니다.");
      if (!path) throw new Error("파일 경로가 없습니다.");

      // 북마크 추가 또는 제거
      isBookmark
        ? await removeBookmark(email, repoName, path)
        : await addBookmark(email, repoName, path);

      setIsBookmark((prev) => !prev);
    } catch (error: any) {
      console.error("북마크 처리 중 에러:", error.message);
      alert(`북마크 처리 중 에러: ${error.message}`);
    }
  };

  // 북마크정보 가져오기
  const checkBookmarkStatus = async () => {
    // email, repoName, path가 유효할 때만 실행
    if (!email || !repoName || !path) return;
    try {
      const isBookmarked = await fetchBookmarks(email, repoName, path);
      setIsBookmark(isBookmarked);
    } catch (error) {
      console.error("북마크 상태를 가져오는 중 에러:", error);
    }
  };

  useEffect(() => {
    checkBookmarkStatus();
  }, []);

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
            id={name}
            onClick={handleBookmarkClick}
          >
            {/* 북마크 */}
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
