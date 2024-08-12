'use client'
import { AssistChipsPrimary } from "@/types/chips/chips";
import { ReactNode, useState } from "react";

function AssistChips({wid , hei , bgColor,children } : {wid : string , hei : string , bgColor? :AssistChipsPrimary ,children : ReactNode}) {
  
  const [onClickButton, setOnClickButton] = useState(false);

  const backGroundClasses = {
    gray1 : 'bg-gray-100' ,
    gray2 : 'bg-gray-200',
    gray3 : 'bg-gray-300',
    gray4 :  'bg-gray-400',
    white : 'bg-white',
  }
  
    return (
      <>
      <div
      onClick={() => setOnClickButton(!onClickButton)}
      style={{width: `${wid}px` , height : `${hei}px`}}
      className={`flex gap-[10px] p-[15px] text-black border border-black text-md justify-center items-center rounded-2xl hover:cursor-pointer hover:bg-purple-100 focus:bg-purple-100 active:bg-primary-purple-100 active:shadow-xl
      ${bgColor ? backGroundClasses[bgColor]:''} ${onClickButton && 'bg-purple-200 shadow-xl text-purple-700 border-1 border-purple-400'} } `}
    >
      {children}
    </div>
      </>
    );
  }
  
  export default AssistChips;
  