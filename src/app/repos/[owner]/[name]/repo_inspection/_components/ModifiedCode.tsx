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
    <div className="mt-11">
      {isCompleted && (
        <ul className="flex flex-col gap-7">
          {arr.map((el) => (
            <li
              key={el.id}
              className="flex flex-col gap-8 rounded-xl bg-accent-red/10 p-5"
            >
              <div className="flex flex-col gap-[10px]">
                <div className="flex items-center gap-2">
                  <code className="text-2xl font-semibold text-accent-red">
                    {el.error}
                  </code>
                  <button
                    type="button"
                    className="whitespace-nowrap rounded-full border-2 border-accent-red px-2 text-accent-red hover:bg-white dark:hover:bg-white/20"
                  >
                    위치보기
                  </button>
                </div>
                <p className="text-lg font-medium text-text-gray-dark dark:text-custom-dark-text">
                  {el.description}
                </p>
              </div>
              <div className="flex flex-col gap-[10px]">
                <h3 className="text-2xl font-bold">수정된 코드</h3>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
