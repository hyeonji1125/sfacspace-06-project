"use client";
import { useGithubStore } from "@/store/useGithubStore";
import { RepositoryContent } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useRepoParams } from "../_utils/useRepoParams";
import FileItem from "./FileItem";

export default function FileListContent({
  isMultiSelectMode,
}: {
  isMultiSelectMode: boolean;
}) {
  const router = useRouter();
  const { owner, name } = useRepoParams();
  const [openDirs, setOpenDirs] = useState<string[]>([]);
  const {
    repoContents,
    selectFile,
    fetchRepoContents,
    toggleSelectFile,
    selectedFiles,
    isLoading,
    error,
  } = useGithubStore();

  // 이렇게 파일리스트를 만들어놓고
  const [fileList, setFileList] = useState(repoContents);

  const handleFileClick = (item: RepositoryContent) => {
    if (item.type === "dir") {
      if (openDirs.includes(item.path)) {
        setOpenDirs(openDirs.filter((path) => path !== item.path));
      } else {
        setOpenDirs([...openDirs, item.path]);
        fetchRepoContents(owner, name, item.path);
        // 위의 요청에서 생긴 repoContents를 fileList에 있는 폴더를 찾아 추가하면 되는 거 아니야? 대신 그 폴더는 또, 재귀로 찾아야하나?
      }
    } else {
      if (isMultiSelectMode) {
        toggleSelectFile(item.path);
      } else {
        if (!selectedFiles.length) {
          toggleSelectFile(item.path);
        } else {
          toggleSelectFile(selectedFiles[0]);
          toggleSelectFile(item.path);
        }
        selectFile(owner, name, item.path);

        const targetURL = `/repos/${owner}/${name}?repo=${item.path}`;
        router.push(targetURL);
      }
    }
  };
  return (
    <ul>
      {repoContents.map((item) => (
        <li
          key={item.sha}
          className="border-b border-line-gray-10 last:border-b-0 dark:border-line-dark/50"
        >
          <div
            role="button"
            className="w-full"
            onClick={() => handleFileClick(item)}
          >
            <FileItem {...item} openDirs={openDirs} />
          </div>

          <ul className="pl-2">
            <FileListContent isMultiSelectMode={isMultiSelectMode} />
          </ul>
        </li>
      ))}
    </ul>
  );
}
