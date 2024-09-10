"use client";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import { useIsPathResult } from "../_utils/useIsPathResult";

export default function FileDropdown() {
  const isResultPage = useIsPathResult();
  const defaultSortArr = ["최신순", "오래된순", "폴더순", "파일순", "북마크순"];
  const additionalSortArr = ["검사한파일순", "미검사순"];
  const sortArr = isResultPage
    ? [...defaultSortArr, ...additionalSortArr]
    : defaultSortArr;
  const [selectedSort, setSelectedSort] = useState(sortArr[0]);

  const handleSortClick = (sort: string) => {
    setSelectedSort(sort);
  };

  return (
    <div
      className={twMerge(
        "absolute -right-20 top-10 z-20 w-32 overflow-hidden rounded-lg bg-white shadow-xl dark:bg-custom-dropdown-dark-bg",
        isResultPage && "-right-28 w-40",
      )}
    >
      <ul>
        {sortArr.map((sort) => (
          <li
            key={sort}
            className={twMerge(
              "flex cursor-pointer items-center gap-[10px] p-[10px] text-lg text-text-gray-default transition-all duration-150 hover:bg-primary-purple-50 hover:text-text-gray-dark dark:hover:bg-primary-purple-50/20 dark:hover:text-text-gray-light",
              selectedSort === sort &&
                "bg-primary-purple-50 font-medium text-text-gray-dark dark:bg-primary-purple-50/20 dark:text-text-gray-light",
            )}
            onClick={() => handleSortClick(sort)}
          >
            {selectedSort === sort && <FaCheck />}
            <span className="whitespace-nowrap">{sort}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
