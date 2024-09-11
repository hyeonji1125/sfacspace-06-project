"use client";
import { useGithubStore } from "@/store/useGithubStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import hljs from "highlight.js";
import "/src/styles/code.css";
import InspectionAlert from "./InspectionAlert";
import { useIsPathResult } from "../_utils/useIsPathResult";
import { twMerge } from "tailwind-merge";
import FileViewerLoading from "./FileViewerLoading";
import { GoXCircleFill } from "react-icons/go";
import { useLlama3Store } from "@/store/useLlama3Store";
import { RepositoryContent } from "@/types";
import { useRepoParams } from "../_utils/useRepoParams";

export default React.memo(function FileViewer() {
  const isResultPage = useIsPathResult();
  const { selectedFile, isLoading, error } = useGithubStore((state) => ({
    selectedFile: state.selectedFile,
    isLoading: state.isLoading,
    error: state.error,
  }));
  const [file, setFile] = useState<RepositoryContent | null>(null);
  const { repoPath } = useRepoParams();
  const [isOpenInspectionAlert, setIsOpenInspectionAlert] = useState(true);
  const closeButtonHandler = () => {
    setIsOpenInspectionAlert(!isOpenInspectionAlert);
  };

  const updateCodeSyntaxHighlighting = () => {
    document.querySelectorAll(".file-viewer-code code").forEach((el) => {
      hljs.highlightElement(el as HTMLElement);
    });
  };

  useEffect(() => {
    //console.log = () => {};
    if (selectedFile && repoPath === selectedFile.path) {
      setFile(selectedFile);
      if (!selectedFile.name.endsWith(".json")) {
        updateCodeSyntaxHighlighting();
      }

      if (isResultPage) {
        setIsOpenInspectionAlert(false);
      } else {
        setIsOpenInspectionAlert(true);
      }
    }
  }, [selectedFile, repoPath]);

  return (
    <div
      className={twMerge(
        "relative flex max-h-[1159px] min-h-[700px] flex-1 flex-col items-center justify-center gap-8 overflow-hidden rounded-2xl border border-line-default p-10 dark:border-line-dark/50",
        isLoading && "justify-start",
        isResultPage && "h-[555px]",
      )}
    >
      {isLoading ? (
        <FileViewerLoading />
      ) : file ? (
        <div className="custom-scrollbar h-full w-full overflow-y-auto">
          <pre className="file-viewer-code whitespace-pre-wrap break-words">
            <code>{file.content}</code>
          </pre>
          {isOpenInspectionAlert && (
            <InspectionAlert close={closeButtonHandler} filePath={file.path} />
          )}
        </div>
      ) : (
        <>
          <Image
            width={48}
            height={48}
            src="/assets/images/myRepository/selectFile.svg"
            alt="select file"
            className="h-12 w-12"
          />
          <p className="text-[32px] font-medium text-primary-purple-500">
            파일을 선택하세요
          </p>
        </>
      )}

      {error && (
        <div className="flex flex-col items-center justify-center gap-4">
          <GoXCircleFill className="text-5xl text-accent-red" />
          <p>파일 내용을 불러올 수 없습니다.</p>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
});
