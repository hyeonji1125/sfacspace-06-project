"use client";
import { useFileStore } from "@/store/useFileStore";
import Image from "next/image";

export default function FileViewer() {
  // 임시 code
  // const [isFile, setIsFile] = useState(true);
  const selectedFile = useFileStore((state) => state.selectedFile);
  return (
    <div
      className={`flex max-h-[976px] min-h-[750px] flex-col items-center gap-7 overflow-hidden rounded-lg border border-line-default p-10 ${!selectedFile && "justify-center"}`}
    >
      {selectedFile ? (
        <>
          <div className="mt-[30px] flex justify-center">
            <Image
              src="/assets/images/myRepository/inspection.svg"
              width={40}
              height={40}
              alt="inspection"
            ></Image>
          </div>
          <div className="mb-2 flex w-3/5 justify-center rounded-md border border-primary-purple-500 bg-primary-purple-50 p-2 text-center text-primary-purple-500">
            취약성 실시간 검사중
          </div>
          <div className="custom-scrollbar h-full w-full overflow-y-auto">
            <pre className="whitespace-pre-wrap text-sm">
              <code>{selectedFile?.code}</code>
            </pre>
          </div>
        </>
      ) : (
        <>
          {/* 파일을 선택하세요 */}
          <Image
            width={40}
            height={40}
            src="/assets/images/myRepository/selectFile.svg"
            alt="select file"
          ></Image>
          <p className="text-2xl text-primary-purple-500">파일을 선택하세요</p>
        </>
      )}
    </div>
  );
}
