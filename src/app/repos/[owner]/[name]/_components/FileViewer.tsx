"use client";
import { useGithubStore } from "@/store/useGithubStore";
import { useLlama3Store } from "@/store/useLlama3Store";
import { AnalysisResult, resultType } from "@/types/llama3";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import hljs from "highlight.js";
import "/src/styles/code.css";
import InspectionAlert from "./InspectionAlert";
import { useIsPathResult } from "../_utils/useIsPathResult";
import { twMerge } from "tailwind-merge";
import FileViewerLoading from "./FileViewerLoading";
import { GoXCircleFill } from "react-icons/go";

export default React.memo(function FileViewer() {
  const isResultPage = useIsPathResult();
  const { selectedFile, isLoading, error } = useGithubStore((state) => ({
    selectedFile: state.selectedFile,
    isLoading: state.isLoading,
    error: state.error,
  }));

  const analysisResults = useLlama3Store((state) => state.analysisResults);
  const [isOpenInspectionAlert, setIsOpenInspectionAlert] = useState(true);

  const currentFileAnalysis = useMemo(() => {
    return analysisResults.find(result => result.path === selectedFile?.path);
  }, [analysisResults, selectedFile]);

  const closeButtonHandler = () => {
    setIsOpenInspectionAlert(!isOpenInspectionAlert);
  };

  const updateCodeSyntaxHighlighting = () => {
    requestAnimationFrame(() => {
      document.querySelectorAll(".file-viewer-code code").forEach((el) => {
        hljs.highlightElement(el as HTMLElement);
      });
    });
  };

  useEffect(() => {
    if (selectedFile) {
      if (!selectedFile.name.endsWith(".json")) {
        setTimeout(updateCodeSyntaxHighlighting, 0);
      }

      setIsOpenInspectionAlert(!isResultPage);
    }
  }, [selectedFile, isResultPage]);

  const renderContent = () => {
    if (!selectedFile || !selectedFile.content) return null;

    const lines = selectedFile.content.split('\n');
    const analysisItems: resultType[] = currentFileAnalysis?.analysisResult?.analysis || [];

    let result = '';
    lines.forEach((line: string, index: number) => {
      const lineNumber = index + 1;
      const analysisItem = analysisItems.find(item => item.lineNumber === lineNumber);
      
      if (analysisItem) result += `<span class="text-yellow-400 font-bold">// ${analysisItems.indexOf(analysisItem) + 1}. ${analysisItem.title}</span>\n`;   
      result += `<span class="hljs-line">${line}</span>\n`;
    });

    return result;
  };

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
      ) : selectedFile ? (
        <div className="custom-scrollbar h-full w-full overflow-y-auto">
          <pre className="file-viewer-code whitespace-pre break-words">
            <code dangerouslySetInnerHTML={{ __html: renderContent() || '' }}></code>
          </pre>
          {isOpenInspectionAlert && (
            <InspectionAlert
              close={closeButtonHandler}
              filePath={selectedFile.path}
            />
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
