"use client";
import Image from "next/image";
import { PiChecks } from "react-icons/pi";
import FileListItem from "./FileListItem";
import { useFileStore } from "@/store/useFileStore";

export default function FileList() {
  // 임시 data, code
  const { list, toggleSelect } = useFileStore();

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
              toggleSelect(item.id);
            }}
          >
            <FileListItem {...item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
