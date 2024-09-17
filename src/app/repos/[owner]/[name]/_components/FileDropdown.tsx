"use client";
import { FaCheck } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import { SortList } from "./FileList";

export default function FileDropdown({
  sortList,
  setSortList,
}: {
  sortList: SortList;
  setSortList: (sort: SortList) => void;
}) {
  const defaultSortArr: SortList[] = ["폴더순", "파일순", "북마크순"];

  const handleSortClick = (sort: SortList) => {
    setSortList(sort); // 부모 컴포넌트의 상태를 업데이트
  };

  return (
    <div
      className={twMerge(
        "absolute -right-20 top-10 z-20 w-32 overflow-hidden rounded-lg bg-white shadow-xl",
      )}
    >
      <ul>
        {defaultSortArr.map((sort) => (
          <li
            key={sort}
            className={twMerge(
              "flex cursor-pointer items-center gap-[10px] p-[10px] text-lg text-text-gray-default transition-all duration-150 hover:bg-primary-purple-50 hover:text-text-gray-dark",
              sortList === sort &&
                "bg-primary-purple-50 font-medium text-text-gray-dark",
            )}
            onClick={() => handleSortClick(sort)}
          >
            {sortList === sort && <FaCheck />}
            <span className="whitespace-nowrap">{sort}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
