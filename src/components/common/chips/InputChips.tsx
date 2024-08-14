'use client'
import { InputChipsType } from '@/types/chips/chips';
import Image from 'next/image';
import { ReactNode, useState } from 'react';

function InputChips({inputType, width, height, children}: {inputType: InputChipsType, width : string, height : string, children: ReactNode}) {
  const [onClickButton, setOnClickButton] = useState(false);

  return (
    <div
      onClick={() => setOnClickButton(!onClickButton)}
      style={{width: `${width}px` , height : `${height}px`}}
      className={`flex gap-[10px] p-[15px] text-black border text-md items-center rounded-xl hover:cursor-pointer hover:bg-purple-100  focus:bg-purple-100 active:bg-primary-purple-100 active:shadow-lg
      ${onClickButton && 'bg-primary-purple-100 shadow-xl'} ${(inputType === 'percentage' || inputType === 'sideIcon') && 'justify-between'} `}
    >
      {/* 이미지 */}
      {inputType !== 'textOnly' && (
        <div className="flex items-center w-[20px] h-[20px] flex-shrink-0">
          <Image alt="파일이미지" width={40} height={20} src="/assets/images/chipsIcon.svg"/>
        </div>
      )}
      {/* 칠드런 박스 */}
      <div className="overflow-hidden whitespace-nowrap text-ellipsis">{children}</div>  
      {/* 퍼센트 */}
      {inputType === 'percentage' && (
        <div className="flex gap-[15px]">
          <div>90%</div> 
        </div>
      )}
      {/* X표시 */}
      {(inputType === 'percentage' || inputType === 'sideIcon') && <div>X</div>}
    </div>
  );
}

export default InputChips;