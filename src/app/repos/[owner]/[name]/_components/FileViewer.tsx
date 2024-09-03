"use client";
import { useGithubStore } from "@/store/useGithubStore";
import Image from "next/image";

export default function FileViewer() {
  const { selectedFile } = useGithubStore();
  return (
    <div
      className={`flex h-[1395px] flex-1 flex-col items-center gap-8 overflow-hidden rounded-2xl border border-line-default p-10 dark:border-line-dark/50 ${!selectedFile && "justify-center"}`}
    >
      {selectedFile ? (
        <div className="custom-scrollbar h-full w-full overflow-y-auto">
          <pre className="whitespace-pre-wrap">
            <code>{selectedFile.content}</code>
          </pre>
        </div>
      ) : (
        <>
          <Image
            width={48}
            height={48}
            src="/assets/images/myRepository/selectFile.svg"
            alt="select file"
          ></Image>
          <p className="text-[32px] font-medium text-primary-purple-500">
            파일을 선택하세요
          </p>
        </>
      )}
    </div>
  );
}
