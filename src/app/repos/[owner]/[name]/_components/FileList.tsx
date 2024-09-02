"use client";
import Image from "next/image";
import { PiChecks } from "react-icons/pi";
import FileListItem from "./FileListItem";
import { useGithubStore } from "@/store/useGithubStore";
import { useRouter } from "next/navigation";
import { RepositoryContent } from "@/types";
import { FaRegFolderOpen } from "react-icons/fa6";
import Breadcrumb from "./BreadCrumb";
import { useState } from "react";
import FileDropdown from "./FileDropdown";

export default function FileList({
  owner,
  name,
  repoPath,
}: {
  owner: string;
  name: string;
  repoPath: string | null;
}) {
  const {
    repoContents,
    selectFile,
    isLoading,
    toggleSelectFile,
    selectedFiles,
    clearSelectedFiles,
    error,
  } = useGithubStore();

  const router = useRouter();
  const [isMultiSelectMode, setIsMultiSelectMode] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleFileClick = (item: RepositoryContent) => {
    if (isMultiSelectMode) {
      toggleSelectFile(item.path);
    } else {
      if (item.type === "dir") {
        router.push(`/repos/${owner}/${name}?repo=${item.path}`);
      } else {
        if (!selectedFiles.length) {
          toggleSelectFile(item.path);
        } else {
          toggleSelectFile(selectedFiles[0]);
          toggleSelectFile(item.path);
        }
        selectFile(owner, name, item.path);

        const lastSlashIndex = item.path.lastIndexOf("/");
        const repoPath = item.path.substring(0, lastSlashIndex);
        const filePath = item.path.substring(lastSlashIndex + 1);

        const targetURL = repoPath
          ? `/repos/${owner}/${name}?repo=${repoPath}&file=${filePath}`
          : `/repos/${owner}/${name}?file=${filePath}`;

        router.push(targetURL);
      }
    }
  };

  const handleParentDirectoryClick = () => {
    if (repoPath) {
      const pathSegments = repoPath.split("/").filter(Boolean);
      pathSegments.pop();
      const parentPath = pathSegments.join("/");
      if (parentPath) {
        router.push(`/repos/${owner}/${name}?repo=${parentPath}`);
      } else {
        router.push(`/repos/${owner}/${name}`);
      }
    }
    setIsMultiSelectMode(false);
  };

  const handleMultiSelectToggle = () => {
    setIsMultiSelectMode(!isMultiSelectMode);
    if (isMultiSelectMode) {
      clearSelectedFiles();
    }
  };

  return (
    <div className="max-h-[988px] rounded-lg border border-line-default dark:border-line-dark/50">
      <div className="flex items-center justify-between rounded-t-lg border-b border-line-default bg-primary-purple-light p-5 dark:bg-primary-purple-200">
        <p className="text-lg dark:text-black">Files</p>
        <div className="flex gap-3 text-2xl">
          <button
            type="button"
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
            {isDropdownVisible && <FileDropdown />}
          </div>
        </div>
      </div>
      {isLoading ? (
        <>loading...</>
      ) : (
        <>
          <Breadcrumb owner={owner} name={name} />
          <ul className="h-full max-h-[918px] overflow-y-auto">
            {repoPath && repoPath !== "" && (
              <li className="items-center border-b border-line-gray-10 dark:border-line-dark/50">
                <button
                  onClick={handleParentDirectoryClick}
                  className="flex w-full gap-1 p-[10px] text-custom-light-text transition-all duration-200 hover:bg-primary-purple-light dark:bg-transparent dark:text-white"
                >
                  <FaRegFolderOpen className="flex-shrink-0 text-xl" />
                  <span>..</span>
                </button>
              </li>
            )}
            {repoContents.map((item) => (
              <li
                key={item.sha}
                className="border-b border-line-gray-10 last:border-b-0 dark:border-line-dark/50"
              >
                <button
                  type="button"
                  className="w-full"
                  onClick={() => handleFileClick(item)}
                >
                  <FileListItem {...item} />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
