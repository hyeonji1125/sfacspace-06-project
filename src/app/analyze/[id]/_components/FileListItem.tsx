import { FaCheck, FaRegFolderOpen } from "react-icons/fa6";
import { GoCheckCircleFill, GoFile } from "react-icons/go";
import { Tfile } from "./FileList";
import Image from "next/image";
import { TbAlertTriangleFilled } from "react-icons/tb";

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
      className={`flex items-center justify-between gap-[10px] border-b border-line-gray-10 p-[10px] text-custom-light-text ${isSelected && "bg-primary-purple-50"}`}
    >
      <div className="flex items-center gap-1">
        {isSelected && <FaCheck className="text-primary-purple-500" />}
        {category === "folder" ? (
          <FaRegFolderOpen className="text-xl" />
        ) : (
          <GoFile className="text-xl" />
        )}
        <span>{name}</span>
      </div>
      <div className="flex items-center gap-1">{statusIcons[status]}</div>
    </div>
  );
}
