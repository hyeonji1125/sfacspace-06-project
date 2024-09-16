"use client";
import { useGithubStore } from "@/store/useGithubStore";
import { RepositoryContent } from "@/types";
import { useRouter } from "next/navigation";
import { useRepoParams } from "../_utils/useRepoParams";
import FileItem from "./FileItem";
import { useEffect, useState } from "react";
import { useLlama3Store } from "@/store/useLlama3Store";
import { useGetUser } from "@/hooks/useGetUser";
import { useIsPathResult } from "../_utils/useIsPathResult";

export default function FileListContent({
  isMultiSelectMode,
}: {
  isMultiSelectMode: boolean;
}) {
  const router = useRouter();
  const { email } = useGetUser();
  const isResult = useIsPathResult();
  const { owner, name } = useRepoParams();
  const {
    repoContents,
    selectFile,
    fetchSubDirectoryContents,
    toggleSelectFile,
    selectedFiles,
  } = useGithubStore((state) => ({
    repoContents: state.repoContents,
    selectFile: state.selectFile,
    fetchSubDirectoryContents: state.fetchSubDirectoryContents,
    toggleSelectFile: state.toggleSelectFile,
    selectedFiles: state.selectedFiles,
  }));
  const { fetchAnalysisResults, analysisStatus, isAnalyzing } =
    useLlama3Store();

  useEffect(() => {
    const fetchAnalysisStatus = async () => {
      if (email && owner && name) {
        await fetchAnalysisResults(email, `${owner}/${name}`);
      }
    };
    fetchAnalysisStatus();
  }, [owner, name, email, fetchAnalysisResults]);

  useEffect(() => {
    console.log("Updated analysis status:", analysisStatus);
    console.log("Is analyzing:", isAnalyzing);
  }, [analysisStatus, isAnalyzing]);

  const handleFolderClick = async (folder: any) => {
    await fetchSubDirectoryContents(owner, name, folder.path);
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
      const baseUrl = `/repos/${owner}/${name}`;
      const targetURL =
        status === "completed" && isResult
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
          console.log(`Rendering node: ${node.path}, status: ${status}`);
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

  return <ul>{renderTree(repoContents)}</ul>;
}
