"use client";

import Image from "next/image";
import { useState } from "react";

export default function CompletedFileViewer() {
  const [isfile, setIsfile] = useState(true);
  const [isCompleted, setIsCompeleted] = useState(true);
  return (
    <div
      className={`relative flex max-h-[976px] min-h-[750px] flex-col items-center gap-7 overflow-hidden rounded-lg border border-grayscale-30 p-10 ${isCompleted ? "border-accent-green" : "justify-center border-line-default"}`}
    >
      {isCompleted ? (
        <>
          <div className="mt-[30px] flex justify-center">
            <Image
              src="/assets/images/myRepository/completed.svg"
              width={40}
              height={40}
              alt="inspection"
            ></Image>
          </div>
          <div className="mb-2 flex w-3/5 justify-center rounded-md border border-accent-green bg-accent-green/10 p-2 text-center text-accent-green">
            분석 완료
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
            amet..", comes from a line in section 1.10.32.\ The standard chunk
            of Lorem Ipsum used since the 1500s is reproduced below for those
            interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et
            Malorum" by Cicero are also reproduced in their exact original form,
            accompanied by English versions from the 1914 translation by H.
            Rackham.
          </div>
        </>
      ) : isfile ? (
        <>
          <div className="blur-sm">
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
          <div className="absolute">
            <div className="flex flex-col items-center justify-center gap-4">
              <Image
                width={50}
                height={50}
                alt="bugImage"
                src="/assets/images/myRepository/bug.svg"
              ></Image>
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
