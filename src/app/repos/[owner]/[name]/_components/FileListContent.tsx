"use client";
import { fetchAllBookmarks } from "@/app/repos/_utils/bookmark"; // 북마크 정보 가져오는 함수
import { sortFiles } from "@/app/repos/_utils/sortItem"; // 정렬 함수
import { useGetUser } from "@/hooks/useGetUser";
import { useGithubStore } from "@/store/useGithubStore";
import { useLlama3Store } from "@/store/useLlama3Store";
import { RepositoryContent } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useRepoParams } from "../_utils/useRepoParams";
import FileItem from "./FileItem";

export default function FileListContent({
  isMultiSelectMode,
  sortList,
}: {
  isMultiSelectMode: boolean;
  sortList: "폴더순" | "파일순" | "북마크순";
}) {
  const router = useRouter();
  const { email } = useGetUser();
  const { owner, name: repoName } = useRepoParams(); // 리포지토리 정보 가져오기
  const {
    repoContents,
    fetchSubDirectoryContents,
    toggleSelectFile,
    selectedFiles,
  } = useGithubStore((state) => ({
    repoContents: state.repoContents,
    fetchSubDirectoryContents: state.fetchSubDirectoryContents,
    toggleSelectFile: state.toggleSelectFile,
    selectedFiles: state.selectedFiles,
  }));
  const { fetchAnalysisResults, analysisStatus } = useLlama3Store();

  const [bookmarkedStatus, setBookmarkedStatus] = useState<{
    [path: string]: boolean;
  }>({}); // 파일별 북마크 상태 저장

  // 북마크 정보 가져오기
  useEffect(() => {
    if (email) {
      fetchAllBookmarks(email, repoName, repoContents, setBookmarkedStatus);
    }
  }, [email, repoName, repoContents]);

  // 분석 상태 가져오기
  useEffect(() => {
    if (email && owner && repoName) {
      fetchAnalysisResults(email, `${owner}/${repoName}`);
    }
  }, [owner, repoName, email, fetchAnalysisResults]);

  // 북마크 정보를 반영한 파일 리스트 생성
  const updatedRepoContents = useMemo(() => {
    return repoContents.map((file) => ({
      ...file,
      isBookmarked: bookmarkedStatus[file.path] || false,
    }));
  }, [repoContents, bookmarkedStatus]); // repoContents나 bookmarkedStatus가 변경될 때마다 실행

  // 파일 리스트 정렬
  const sortedContents = useMemo(
    () => sortFiles(updatedRepoContents, sortList),
    [updatedRepoContents, sortList],
  );

  const handleFolderClick = async (folder: any) => {
    await fetchSubDirectoryContents(owner, repoName, folder.path);
  };

  const handleFileClick = (item: RepositoryContent, status: string) => {
    if (isMultiSelectMode) {
      toggleSelectFile(item.path);
    } else {
      if (!selectedFiles.length) {
        toggleSelectFile(item.path);
      } else {
        toggleSelectFile(selectedFiles[0]);
        toggleSelectFile(item.path);
      }
      const baseUrl = `/repos/${owner}/${repoName}`;
      const targetURL =
        status === "completed"
          ? `${baseUrl}/repo_inspection?repo=${item.path}`
          : `${baseUrl}?repo=${item.path}`;

      router.push(targetURL);
    }
  };

  const renderTree = (nodes: RepositoryContent[]) => {
    return (
      <>
        {nodes.map((node) => {
          const status = analysisStatus[node.path] || "none";
          return (
            <li
              key={node.sha}
              className="cursor-pointer border-b border-line-gray-10 last:border-b-0 dark:border-line-dark/50"
            >
              {node.type === "dir" ? (
                <>
                  <div onClick={() => handleFolderClick(node)}>
                    <FileItem
                      {...node}
                      expanded={node.expanded}
                      status={status}
                    />
                  </div>
                  {node.expanded && node.children && (
                    <ul className="pl-4">{renderTree(node.children)}</ul>
                  )}
                </>
              ) : (
                <div onClick={() => handleFileClick(node, status)}>
                  <FileItem {...node} status={status} />
                </div>
              )}
            </li>
          );
        })}
      </>
    );
  };

  return <ul>{renderTree(sortedContents)}</ul>;
}
