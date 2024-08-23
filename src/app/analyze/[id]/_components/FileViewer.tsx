"use client";
import Image from "next/image";
import { useState } from "react";

export default function FileViewer() {
  // 임시 code
  const [isFile, setIsFile] = useState(true);
  return (
    <div
      className={`flex max-h-[976px] min-h-[750px] flex-col items-center gap-7 overflow-hidden rounded-lg border border-line-default p-10 ${!isFile && "justify-center"}`}
    >
      {isFile ? (
        <>
          <div className="mt-[30px] flex justify-center">
            {/* 원래 마진 탑 40px인데 너무 민둥성이라 조금 낮췄어여 */}
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
          <div className="custom-scrollbar h-full overflow-y-scroll">
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a
            treatise on the theory of ethics, very popular during the
            Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
            amet..", comes from a line in section 1.10.32. The standard chunk of
            Lorem Ipsum used since the 1500s is reproduced below for those
            interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
            Malorum" by Cicero are also reproduced in their exact original form,
            accompanied by English versions from the 1914 translation by H.
            Rackham.
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
