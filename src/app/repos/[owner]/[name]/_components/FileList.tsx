"use client";
import { useGithubStore } from "@/store/useGithubStore";
import Image from "next/image";
import { useState } from "react";
import { PiChecks } from "react-icons/pi";
import FileDropdown from "./FileDropdown";
import FileListContent from "./FileListContent";
import FileListLoading from "./FileListLoading";

export type SortList = "파일순" | "폴더순" | "북마크순";

export default function FileList({
  isLoading,
  isMultiSelectMode,
  setIsMultiSelectMode,
}: {
  isLoading: boolean;
  isMultiSelectMode: boolean;
  setIsMultiSelectMode: (value: boolean) => void;
}) {
  const clearSelectedFiles = useGithubStore(
    (state) => state.clearSelectedFiles,
  );

  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [sortList, setSortList] = useState<SortList>("파일순"); // 정렬 상태 관리

  const handleMultiSelectToggle = () => {
    setIsMultiSelectMode(!isMultiSelectMode);
    if (isMultiSelectMode) {
      clearSelectedFiles();
    }
  };

  return (
    <div className="flex max-h-[800px] w-80 flex-col rounded-lg border border-line-default dark:border-line-dark/50">
      <div className="flex items-center justify-between rounded-t-lg border-b border-line-default bg-primary-purple-light p-5 dark:bg-primary-purple-200">
        <p className="text-lg dark:text-black">Files</p>
        <div className="flex gap-3 text-2xl">
          <button
            type="button"
            title="multipleSelect"
            onClick={handleMultiSelectToggle}
            className={`transition-color rounded-full p-1 duration-200 ease-in-out hover:bg-primary-purple-500/50 hover:text-white dark:hover:text-white ${
              isMultiSelectMode
                ? "bg-primary-purple-500 text-white dark:text-white"
                : "bg-transparent dark:text-black"
            }`}
          >
            <PiChecks />
          </button>
          <div className="relative flex items-center">
            <button
              type="button"
              onClick={() => setIsDropdownVisible((prev) => !prev)}
            >
              <Image
                src="/assets/images/myRepository/listCaption.svg"
                alt="listCaption"
                width={24}
                height={24}
              />
            </button>
            {isDropdownVisible && (
              <FileDropdown sortList={sortList} setSortList={setSortList} />
            )}
          </div>
        </div>
      </div>

      <div className="custom-scrollbar flex-grow overflow-y-auto">
        {isLoading ? (
          <FileListLoading />
        ) : (
          <FileListContent
            isMultiSelectMode={isMultiSelectMode}
            sortList={sortList} // 정렬 상태 전달
          />
        )}
      </div>
    </div>
  );
}
