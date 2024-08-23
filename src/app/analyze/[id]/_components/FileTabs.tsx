"use client";
import InputChips from "@/components/common/chips/InputChips";
import ProgressBar from "@/components/common/ProgressBar";
import { useState } from "react";

export default function FileTabs() {
  // 임시 data, code
  const arr = [
    { id: 1, fileName: ".eslintrc.json", percentage: 92 },
    { id: 2, fileName: ".eslintrc.json", percentage: 80 },
    { id: 3, fileName: ".eslintrc.json", percentage: 72 },
    { id: 4, fileName: ".eslintrc.json", percentage: 50 },
    { id: 5, fileName: ".eslintrc.json", percentage: 66 },
  ];

  const [percent, setPersent] = useState(arr[0].percentage);
  const [selectedFile, isSelectedFile] = useState(arr[0].id);

  const onClickHandler = (file: {
    id: number;
    fileName: string;
    percentage: number;
  }) => {
    isSelectedFile(file.id);
    setPersent(file.percentage);
  };

  return (
    <div className="flex flex-1 flex-col gap-5 overflow-hidden rounded-lg border border-primary-purple-100 p-5">
      <div className="custom-scrollbar overflow-x-auto">
        <ul className="flex gap-7">
          {arr.map((el) => (
            <li key={el.id} onClick={() => onClickHandler(el)}>
              <InputChips
                isSelected={selectedFile === el.id}
                percent={el.percentage}
                inputType="sideIcon"
              >
                {el.fileName}
              </InputChips>
            </li>
          ))}
        </ul>
      </div>
      <ProgressBar percent={percent} />
    </div>
  );
}
