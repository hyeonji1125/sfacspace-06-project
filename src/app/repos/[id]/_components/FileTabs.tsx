"use client";
import InputChips from "@/components/common/chips/InputChips";
import ProgressBar from "@/components/common/ProgressBar";
import { Tfile, useFileStore } from "@/store/useFileStore";
import { useState } from "react";

export default function FileTabs() {
  // 임시 data,
  // const arr = [
  //   { id: 1, fileName: ".eslintrc.json", percentage: 92 },
  //   { id: 2, fileName: ".eslintrc.json", percentage: 80 },
  //   { id: 3, fileName: ".eslintrc.json", percentage: 72 },
  //   { id: 4, fileName: ".eslintrc.json", percentage: 50 },
  //   { id: 5, fileName: ".eslintrc.json", percentage: 66 },
  // ];
  const list = useFileStore((state) => state.list);

  const selectedFile = useFileStore((state) => state.selectedFile);
  const setSelectedFile = useFileStore((state) => state.setSelectedFile);

  const [percent, setPersent] = useState<number | undefined>();
  const onClickHandler = (file: Tfile) => {
    setSelectedFile(file);
    setPersent(file.percentage);
  };

  return (
    <div className="flex flex-1 flex-col gap-5 overflow-hidden rounded-lg border border-primary-purple-100 p-5">
      <div className="custom-scrollbar overflow-x-auto">
        <ul className="flex gap-7">
          {list.map((item) => (
            <li key={item.id} onClick={() => onClickHandler(item)}>
              <InputChips
                isSelected={selectedFile?.id === item.id}
                percent={item.percentage}
                inputType="sideIcon"
              >
                {item.name}
              </InputChips>
            </li>
          ))}
        </ul>
      </div>
      <ProgressBar percent={percent} />
    </div>
  );
}
