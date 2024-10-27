"use client";
import { useGithubStore } from "@/store/useGithubStore";
import { useLlama3Store } from "@/store/useLlama3Store";
import { AnalysisResult, resultType } from "@/types/llama3";
import Image from "next/image";
import React, { useEffect, useMemo, useRef, useState } from "react";
import hljs from "highlight.js";
import "/src/styles/code.css";
import InspectionAlert from "./InspectionAlert";
import { twMerge } from "tailwind-merge";
import { GoXCircleFill } from "react-icons/go";
import { useResultOpenStore } from "@/store/useResultOpenStore";
import { SelectFile } from "../../../../../../public/assets/svg/SvgIcons";
import FileViewerLoading from "./FileViewerLoading";
import { useSession } from "next-auth/react";

export default React.memo(function FileViewer() {
  const { status } = useSession();
  const { resultOpen, setResultOpen } = useResultOpenStore((state) => ({
    resultOpen: state.resultOpen,
    setResultOpen: state.setResultOpen,
  }));
  const { selectedFile, error } = useGithubStore((state) => ({
    selectedFile: state.selectedFile,
    isLoading: state.isLoading,
    error: state.error,
  }));

  const analysisResults = useLlama3Store((state) => state.analysisResults);
  const focusedLocation = useLlama3Store((state) => state.focusedLocation);
  const [isOpenInspectionAlert, setIsOpenInspectionAlert] = useState(true);
  const codeRef = useRef<HTMLPreElement>(null);

  const currentFileAnalysis = useMemo(() => {
    return analysisResults.find((result) => result.path === selectedFile?.path);
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
    // selectedFile이 변경될 때 resultOpen을 false로 초기화
    setResultOpen(false);
  }, [selectedFile]);

  useEffect(() => {
    if (selectedFile && selectedFile.content) {
      if (!selectedFile.name.endsWith(".json")) {
        updateCodeSyntaxHighlighting();
      }

      setIsOpenInspectionAlert(!resultOpen);
    }
  }, [selectedFile, resultOpen]);

  useEffect(() => {
    if (focusedLocation && codeRef.current) {
      const titleElement = codeRef.current.querySelector(
        `[data-title="${focusedLocation}"]`,
      );
      if (titleElement) {
        titleElement.scrollIntoView({ behavior: "smooth", block: "center" });
        titleElement.classList.remove("text-yellow-400");
        titleElement.classList.add("text-red-500");
      }
    }
  }, [focusedLocation]);

  const renderContent = () => {
    if (!selectedFile || !selectedFile.content) return null;

    const lines = selectedFile.content.split("\n");
    const analysisItems: resultType[] =
      currentFileAnalysis?.analysisResult?.analysis || [];

    let result = "";
    lines.forEach((line: string, index: number) => {
      const lineNumber = index + 1;
      const analysisItem = analysisItems.find(
        (item) => item.lineNumber === lineNumber,
      );

      /* 
      취약점 title 추가
      이 부분은 HTML 동적으로 끼워넣어서 code highlight에서 오류를 보임
      추후 수정해야함 
      */
      if (analysisItem) {
        result += `<span class="text-yellow-400 font-bold" data-title="${analysisItem.title}">// ${analysisItems.indexOf(analysisItem) + 1}. ${analysisItem.title}</span>\n`;
      }
      result += `<span class="hljs-line">${line}</span>\n`;
    });

    return result;
  };

  if (status === "loading") {
    return (
      <div
        className={twMerge(
          "flex max-h-[1159px] min-h-[700px] flex-1 flex-col items-center rounded-2xl border border-line-default p-10 dark:border-line-dark/30",
        )}
      >
        <FileViewerLoading />
      </div>
    );
  }

  return (
    <div
      className={twMerge(
        "relative flex max-h-[1159px] min-h-[700px] flex-1 flex-col items-center justify-center gap-8 overflow-hidden rounded-2xl border border-line-default p-10 dark:border-line-dark/30",
        resultOpen && "h-[555px]",
        !error && selectedFile && "justify-start",
      )}
    >
      {error ? (
        <div className="flex flex-col items-center justify-center gap-4">
          <GoXCircleFill className="text-5xl text-accent-red" />
          <p>파일 내용을 불러올 수 없습니다.</p>
          <p>{error}</p>
        </div>
      ) : selectedFile ? (
        <div className="custom-scrollbar h-full w-full overflow-y-auto">
          <pre
            key={selectedFile.sha}
            ref={codeRef}
            className="file-viewer-code whitespace-pre-wrap break-words"
          >
            <code
            //{/*이거 코드 보일 때 이상하게 보여서 일단 주석처리 했습니당*/}
            // dangerouslySetInnerHTML={{ __html: renderContent() || "" }}
            >
              {selectedFile.content}
            </code>
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
          <SelectFile className="h-12 w-12" />
          <p className="text-[32px] font-medium text-primary-purple-500 dark:text-primary-purple-300">
            파일을 선택하세요
          </p>
        </>
      )}
    </div>
  );
});
