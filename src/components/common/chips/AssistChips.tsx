'use client'

import { AssistType } from "@/types/chips";
import { ReactNode, useState } from "react";

function AssistChips({
  width,
  height,
  assistType,
  disabled,
  children,
}: {
  width?: string;
  height?: string;
  assistType?: AssistType;
  disabled?: boolean;
  children: ReactNode;
}) {
  const [onClickButton, setOnClickButton] = useState(false);

  const AssistChipsClasses = {
    outline: disabled
      ? "text-gray-400 border-gray-300"
      : ` border-black hover:bg-gray-200 focus:bg-gray-300 active:bg-gray-300}`,
    elevated: disabled
      ? "text-gray-400 border-gray-300"
      : `bg-violet-50  hover:bg-violet-100 focus:bg-violet-200 active:bg-violet-300 ${onClickButton && "bg-violet-200"}`,
    outlinePrimary: disabled
      ? `text-gray-300 border-violet-300 `
      : `bg-violet-50 border-violet-300 text-violet-700  hover:bg-violet-100 focus:border-violet-700 active:border-violet-900 ${onClickButton && "bg-violet-200"}`,
  };

  return (
    <>
      <div
        onClick={() => setOnClickButton(!onClickButton)}
        style={{
          width: width ? `${width}px` : "auto",
          height: height ? `${height}px` : "auto",
        }}
        className={`text-md flex items-center justify-center gap-[10px] rounded-full border px-3 py-2 ${assistType ? AssistChipsClasses[assistType] : ""} `}
      >
        {children}
      </div>
    </>
  );
}

export default AssistChips;

//드래그 할 때 사용 : shadow-xl
