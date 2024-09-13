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
import { RepositoryContent } from "@/types";
import { useRepoParams } from "../_utils/useRepoParams";

export default React.memo(function FileViewer() {
  const isResultPage = useIsPathResult();
  const { selectFile, selectedFile, isLoading, error } = useGithubStore(
    (state) => ({
      selectFile: state.selectFile,
      selectedFile: state.selectedFile,
      isLoading: state.isLoading,
      error: state.error,
    }),
  );
  const [file, setFile] = useState<RepositoryContent | null>(null);
  const { owner, name, repoPath } = useRepoParams();
  const [isOpenInspectionAlert, setIsOpenInspectionAlert] = useState(true);
  const closeButtonHandler = () => {
    setIsOpenInspectionAlert(!isOpenInspectionAlert);
  };

  const loadContent = async () => {
    if (repoPath) {
      await selectFile(owner, name, repoPath);
      if (selectedFile && repoPath === selectedFile.path) {
        setFile(selectedFile);
      }
    }
  };

  useEffect(() => {
    loadContent();
  }, [repoPath]);

  useEffect(() => {
    if (selectedFile && repoPath === selectedFile.path) {
      setFile(selectedFile);
    }
  }, [selectedFile, repoPath]);

  useEffect(() => {
    //console.log = () => {};
    // if (file && !file.name.endsWith(".json")) {
    //   const elements = document.querySelectorAll(".file-viewer-code code");
    //   if (elements.length > 0) {
    //     elements.forEach((el) => {
    //       hljs.highlightElement(el as HTMLElement);
    //     });
    //   }
    // }

    if (isResultPage) {
      setIsOpenInspectionAlert(false);
    } else {
      setIsOpenInspectionAlert(true);
    }
  }, [file]);

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
