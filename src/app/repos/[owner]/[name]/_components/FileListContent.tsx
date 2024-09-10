"use client";
import { useGithubStore } from "@/store/useGithubStore";
import { RepositoryContent } from "@/types";
import { useRouter } from "next/navigation";
import { useRepoParams } from "../_utils/useRepoParams";
import FileItem from "./FileItem";

export default function FileListContent({
  isMultiSelectMode,
}: {
  isMultiSelectMode: boolean;
}) {
  const router = useRouter();
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

  const handleFolderClick = async (folder: any) => {
    await fetchSubDirectoryContents(owner, name, folder.path);
  };

  const handleFileClick = (item: RepositoryContent) => {
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
  };

  const renderTree = (nodes: RepositoryContent[]) => {
    return (
      <>
        {nodes.map((node) => (
          <li
            key={node.sha}
            className="cursor-pointer border-b border-line-gray-10 last:border-b-0 dark:border-line-dark/50"
          >
            {node.type === "dir" ? (
              <>
                <div onClick={() => handleFolderClick(node)}>
                  <FileItem {...node} expanded={node.expanded} />
                </div>
                {node.expanded && node.children && (
                  <ul className="pl-4">{renderTree(node.children)}</ul>
                )}
              </>
            ) : (
              <div onClick={() => handleFileClick(node)}>
                <FileItem {...node} />
              </div>
            )}
          </li>
        ))}
      </>
    );
  };

  return <ul>{renderTree(repoContents)}</ul>;
}
