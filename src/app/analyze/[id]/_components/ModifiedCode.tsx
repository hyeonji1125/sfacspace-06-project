"use client";

import { useState } from "react";

export default function ModifiedCode() {
  // 임시 data, code
  const [isCompleted, setIsCompeleted] = useState(true);
  const arr = [
    {
      id: 1,
      error: `color:#333;`,
      description:
        "컬러 코드를 설정할때 이렇게 하게 되면 오류가 생기기 때문에 이렇게 하지 않는게 좋다.",
    },
    {
      id: 2,
      error: `import {Badge} from "@/components/ui/badge";`,
      description:
        "컬러코드를 설정할때 이렇게 하게 되면 이런 오류가 생기기 때문에 이렇게 하지 않는게 좋다.",
    },
  ];
  return (
    <>
      {isCompleted && (
        <div className="flex flex-col gap-7">
          <h3 className="text-2xl font-bold">수정할 코드</h3>
          {arr.map((el) => (
            <div
              key={el.id}
              className="flex flex-col gap-[10px] rounded-xl bg-accent-red/10 p-5"
            >
              <div className="flex items-center gap-2">
                <code className="text-2xl font-medium text-accent-red">
                  {el.error}
                </code>
                <button
                  type="button"
                  className="whitespace-nowrap rounded-full border-2 border-accent-red px-2 text-accent-red hover:bg-white"
                >
                  위치보기
                </button>
              </div>
              <p className="text-lg text-custom-light-text">{el.description}</p>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
