import { InputChipsType } from "@/types/chips";
import Image from "next/image";
import { ReactNode } from "react";
import { IoIosClose } from "react-icons/io";

function InputChips({
  inputType,
  children,
  isSelected,
  percent,
}: {
  inputType: InputChipsType;
  children: ReactNode;
  isSelected: boolean;
  percent?: number;
}) {
  return (
    <div
      className={`text-md flex w-[221px] items-center gap-[10px] rounded-xl px-3 py-2 text-black hover:cursor-pointer hover:bg-purple-100 focus:bg-purple-100 active:bg-primary-purple-100 active:shadow-lg ${isSelected && "bg-primary-purple-100 shadow-xl"} ${(inputType === "percentage" || inputType === "sideIcon") && "justify-between"} `}
    >
      {/* 이미지 */}
      {inputType !== "textOnly" && (
        <div className="flex h-[20px] w-[20px] flex-shrink-0 items-center">
          <Image
            alt="파일이미지"
            width={40}
            height={20}
            src="/assets/images/chipsIcon.svg"
          />
        </div>
      )}
      {/* 칠드런 박스 */}
      <div className="overflow-hidden text-ellipsis whitespace-nowrap">
        {children}
      </div>
      {/* 퍼센트 */}
      {isSelected && percent && (
        <div className="flex gap-[15px]">
          <div>{percent}%</div>
        </div>
      )}
      {/* X표시 */}
      {inputType === "sideIcon" && <IoIosClose className="text-xl" />}
    </div>
  );
}

export default InputChips;
