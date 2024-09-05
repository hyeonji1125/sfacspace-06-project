"use client";
import { useGithubStore } from "@/store/useGithubStore";
import Image from "next/image";
import { useEffect, useState } from "react";
import hljs from "highlight.js";
import "/src/styles/code.css";
import InspectionAlert from "./InspectionAlert";
import { useTheme } from "next-themes";
import { isPathResult } from "../_utils/isPathResult";
// import "highlight.js/styles/github-dark.css";

export default function FileViewer() {
  const { theme } = useTheme();
  const isResultPage = isPathResult();
  const { selectedFile, isLoading } = useGithubStore();
  // 임시
  const [isOpenInspectionAlert, setIsOpenInspectionAlert] = useState(true);

  const closeButtonHandler = () => {
    setIsOpenInspectionAlert(!isOpenInspectionAlert);
  };

  useEffect(() => {
    if (selectedFile) {
      hljs.highlightAll();
      if (isResultPage) {
        setIsOpenInspectionAlert(false);
      } else {
        setIsOpenInspectionAlert(true);
      }
    }
  }, [selectedFile]);

  useEffect(() => {
    document.querySelectorAll("pre code").forEach((block) => {
      // 여기서 block을 HTMLElement로 명시적 타입 캐스팅
      hljs.highlightElement(block as HTMLElement);
    });
  }, [theme]);

  return (
    <div
      className={`relative flex h-[1395px] flex-1 flex-col items-center gap-8 overflow-hidden rounded-2xl border border-line-default p-10 dark:border-line-dark/50 ${
        !selectedFile && "justify-center"
      }`}
    >
      {isLoading ? (
        // Loading 상태일 때
        <p className="text-2xl">Loading...</p>
      ) : selectedFile ? (
        // 파일이 선택되었을 때
        <div className="custom-scrollbar h-full w-full overflow-y-auto">
          <pre className="whitespace-pre-wrap break-words">
            <code>{selectedFile.content}</code>
          </pre>
          {isOpenInspectionAlert && (
            <InspectionAlert close={closeButtonHandler} />
          )}
        </div>
      ) : (
        // 파일이 선택되지 않았을 때
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
    </div>
  );
}
