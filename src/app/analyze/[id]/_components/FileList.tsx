"use client";
import Image from "next/image";
import { PiChecks } from "react-icons/pi";
import FileListItem from "./FileListItem";
import { useState } from "react";

// 임시 data라 그냥 component에서 category줬습니다 나중에 지울게요!
export type Tfile = {
  id: number;
  category: "folder" | "file";
  name: string;
  isSelected: boolean;
  status: "inprogress" | "pending" | "completed" | "error" | "none";
};

export default function FileList() {
  // 임시 data, code
  const [list, setList] = useState<Tfile[]>([
    {
      id: 1,
      category: "folder",
      name: "public",
      isSelected: false,
      status: "none",
    },
    {
      id: 2,
      category: "folder",
      name: "src",
      isSelected: false,
      status: "none",
    },
    {
      id: 3,
      category: "file",
      name: ".startttt.json",
      isSelected: false,
      status: "completed",
    },
    {
      id: 4,
      category: "file",
      name: ".eslintrc.json",
      isSelected: false,
      status: "pending",
    },
    {
      id: 5,
      category: "file",
      name: ".eslintrc.json",
      isSelected: false,
      status: "inprogress",
    },
    {
      id: 6,
      category: "file",
      name: ".eslintrc.json",
      isSelected: false,
      status: "error",
    },
    {
      id: 7,
      category: "file",
      name: ".eslintrc.json",
      isSelected: false,
      status: "none",
    },
    {
      id: 8,
      category: "file",
      name: ".eslintrc.json",
      isSelected: false,
      status: "none",
    },
    {
      id: 9,
      category: "file",
      name: ".eslintrc.json",
      isSelected: false,
      status: "none",
    },
    {
      id: 10,
      category: "file",
      name: ".eslintrc.json",
      isSelected: false,
      status: "none",
    },
    {
      id: 11,
      category: "file",
      name: ".eslintrc.json",
      isSelected: false,
      status: "none",
    },
    {
      id: 12,
      category: "file",
      name: ".eslintrc.json",
      isSelected: false,
      status: "none",
    },
    {
      id: 13,
      category: "file",
      name: ".eslintrc.json",
      isSelected: false,
      status: "none",
    },
    {
      id: 14,
      category: "file",
      name: ".eslintrc.json",
      isSelected: false,
      status: "none",
    },
    {
      id: 15,
      category: "file",
      name: ".eslintrc.json",
      isSelected: false,
      status: "none",
    },
    {
      id: 16,
      category: "file",
      name: ".eslintrc.json",
      isSelected: false,
      status: "none",
    },
    {
      id: 17,
      category: "file",
      name: ".eslintrc.json",
      isSelected: false,
      status: "none",
    },
    {
      id: 18,
      category: "file",
      name: ".eslintrc.json",
      isSelected: false,
      status: "none",
    },
    {
      id: 19,
      category: "file",
      name: ".eslintrc.json",
      isSelected: false,
      status: "none",
    },
    {
      id: 20,
      category: "file",
      name: ".eslintrc.json",
      isSelected: false,
      status: "none",
    },
    {
      id: 21,
      category: "file",
      name: ".ennnnnnd.json",
      isSelected: false,
      status: "none",
    },
  ]);

  const onClickHandler = (id: number) => {
    setList((prevList) =>
      prevList.map((item) =>
        item.id === id ? { ...item, isSelected: !item.isSelected } : item,
      ),
    );
  };

  return (
    <div className="max-h-[988px] overflow-hidden rounded-lg border border-line-default">
      <div className="bg-primary-purple-light flex items-center justify-between border-b border-line-default p-5">
        <p className="text-lg">2024.06.08</p>
        <div className="flex gap-3 text-2xl">
          <button type="button">
            <PiChecks />
          </button>
          <button type="button">
            <Image
              src="/assets/images/myRepository/listCaption.svg"
              alt="listCaption"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
      <ul className="h-full max-h-[918px] overflow-y-auto">
        {list.map((item) => (
          <li
            key={item.id}
            onClick={() => {
              onClickHandler(item.id);
            }}
          >
            <FileListItem {...item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
