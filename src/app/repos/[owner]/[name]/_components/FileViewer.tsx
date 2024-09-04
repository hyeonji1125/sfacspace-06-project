"use client";
import { useGithubStore } from "@/store/useGithubStore";
import Image from "next/image";
import { useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
// import "highlight.js/styles/github-dark.css";

export default function FileViewer() {
  const { selectedFile, isLoading } = useGithubStore();

  useEffect(() => {
    if (selectedFile) {
      hljs.highlightAll();
    }
  }, [selectedFile]);

  return (
    <div
      className={`flex h-[1395px] flex-1 flex-col items-center gap-8 overflow-hidden rounded-2xl border border-line-default p-10 dark:border-line-dark/50 ${
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
