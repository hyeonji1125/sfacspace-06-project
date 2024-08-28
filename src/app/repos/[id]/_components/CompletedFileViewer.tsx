"use client";

import { useFileStore } from "@/store/useFileStore";
import Image from "next/image";

export default function CompletedFileViewer() {
  // const [isfile, setIsfile] = useState(true);
  // const [isCompleted, setIsCompeleted] = useState(true);
  const selectedFile = useFileStore((state) => state.selectedFile);
  return (
    <div
      className={`relative flex max-h-[976px] min-h-[750px] flex-col items-center gap-7 overflow-hidden rounded-lg border border-grayscale-30 p-10 ${selectedFile && selectedFile.percentage === 100 ? "border-accent-green" : "justify-center border-line-default"}`}
    >
      {/*mockup 일단 진행률 100퍼면 분석완료 페이지 보이게 함*/}
      {selectedFile && selectedFile.percentage === 100 ? (
        <>
          <div className="mt-[30px] flex justify-center">
            <Image
              src="/assets/images/myRepository/completed.svg"
              width={40}
              height={40}
              alt="inspection"
            />
          </div>
          <div className="mb-2 flex w-3/5 justify-center rounded-md border border-accent-green bg-accent-green/10 p-2 text-center text-accent-green">
            분석 완료
          </div>
          <div className="custom-scrollbar h-full w-full overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm">
              <code>{selectedFile?.code}</code>
            </pre>
          </div>
        </>
      ) : selectedFile ? (
        <>
          <div className="blur-sm">
            <pre className="whitespace-pre-wrap text-sm">
              <code>{selectedFile?.code}</code>
            </pre>
          </div>
          <div className="absolute">
            <div className="flex flex-col items-center justify-center gap-4">
              <Image
                width={50}
                height={50}
                alt="bugImage"
                src="/assets/images/myRepository/bug.svg"
              />
              <div className="flex justify-center text-lg font-extrabold">
                분석 대기중
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <Image
            width={40}
            height={40}
            src="/assets/images/myRepository/noneFile.svg"
            alt="select file"
          ></Image>
          <p className="text-2xl">분석할 파일이 없어요!</p>
        </>
      )}
    </div>
  );
}
