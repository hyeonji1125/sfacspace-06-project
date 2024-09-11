"use client";
import Image from "next/image";
import { PiChecks } from "react-icons/pi";
import { useGithubStore } from "@/store/useGithubStore";
import { useState } from "react";
import FileDropdown from "./FileDropdown";
import FileListContent from "./FileListContent";
import FileListLoading from "./FileListLoading";

export default function FileList({ isLoading }: { isLoading: boolean }) {
  const clearSelectedFiles = useGithubStore(
    (state) => state.clearSelectedFiles,
  );

  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleMultiSelectToggle = () => {
    setIsMultiSelectMode(!isMultiSelectMode);
    if (isMultiSelectMode) {
      clearSelectedFiles();
    }
  };

  return (
    <div className="flex max-h-[1084px] w-80 flex-col overflow-hidden rounded-lg border border-line-default dark:border-line-dark/50">
      <div className="flex items-center justify-between rounded-t-lg border-b border-line-default bg-primary-purple-light p-5 dark:bg-primary-purple-200">
        <p className="text-lg dark:text-black">Files</p>
        <div className="flex gap-3 text-2xl">
          <button
            type="button"
            title="multipleSelect"
            onClick={handleMultiSelectToggle}
            className={`transition-color rounded-full p-1 duration-200 ease-in-out hover:bg-primary-purple-500/50 hover:text-white dark:hover:text-white ${isMultiSelectMode
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
            {isDropdownVisible && <FileDropdown />}
          </div>
        </div>
      </div>

      <div className="flex-grow overflow-y-auto">
        {isLoading ? (
          <FileListLoading />
        ) : (
          <FileListContent isMultiSelectMode={isMultiSelectMode} />
        )}
      </div>
    </div>
  );
}
