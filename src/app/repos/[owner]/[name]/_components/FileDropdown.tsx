"use client";
import { useEffect, useRef } from "react"; // 추가
import { FaCheck } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import { SortList } from "./FileList";

export default function FileDropdown({
  sortList,
  setSortList,
  setIsDropdownVisible, // 추가: 드롭다운 상태를 변경하기 위한 함수
}: {
  sortList: SortList;
  setSortList: (sort: SortList) => void;
  setIsDropdownVisible: (visible: boolean) => void; // 추가
}) {
  const defaultSortArr: SortList[] = ["폴더순", "파일순", "북마크순"];

  const dropdownRef = useRef<HTMLDivElement>(null); // 드롭다운을 참조하는 ref

  const handleSortClick = (sort: SortList) => {
    setSortList(sort); // 부모 컴포넌트의 상태를 업데이트
    setIsDropdownVisible(false); // 항목 클릭 시 드롭다운 닫기
  };

  // 외부 클릭 감지를 위한 useEffect
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false); // 외부 클릭 시 드롭다운 닫기
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsDropdownVisible]);

  return (
    <div
      ref={dropdownRef} // 드롭다운 요소에 ref 적용
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
