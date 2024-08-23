import { FaCheck, FaRegFolderOpen } from "react-icons/fa6";
import { GoCheckCircleFill, GoFile } from "react-icons/go";
import { Tfile } from "./FileList";
import Image from "next/image";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { twMerge } from "tailwind-merge";

export default function FileListItem({
  category,
  name,
  isSelected,
  status,
}: Tfile) {
  const statusIcons = {
    inprogress: (
      <>
        <Image
          src="/assets/images/myRepository/loader.svg"
          alt="loader"
          width={20}
          height={20}
        />
        <span>분석중</span>
      </>
    ),
    pending: <span className="text-text-gray-default">대기중..</span>,
    completed: (
      <>
        <GoCheckCircleFill className="text-xl text-accent-green" />
        <span>완료</span>
      </>
    ),
    error: (
      <>
        <TbAlertTriangleFilled className="text-xl text-accent-red" />
        <span>오류</span>
      </>
    ),
    none: null,
  };

  return (
    <div
      className={twMerge(
        "flex items-center justify-between gap-[10px] border-b border-line-gray-10 bg-white p-[10px] text-custom-light-text transition-all duration-200",
        isSelected && "bg-primary-purple-50",
      )}
    >
      <div
        className={twMerge(
          "flex w-[120px] items-center gap-1",
          status === "none" && "w-full",
        )}
      >
        {isSelected && (
          <FaCheck className="flex-shrink-0 text-primary-purple-500" />
        )}
        {category === "folder" ? (
          <FaRegFolderOpen className="flex-shrink-0 text-xl" />
        ) : (
          <GoFile className="flex-shrink-0 text-xl" />
        )}
        <span className="overflow-hidden text-ellipsis whitespace-nowrap">
          {name}
        </span>
      </div>
      <div className="flex items-center gap-1 whitespace-nowrap">
        {statusIcons[status]}
      </div>
    </div>
  );
}
