'use client'
import { SuggestionChipsColor } from '@/types/chips/chips'
import { ReactNode, useState } from 'react'



export default function SuggestionChips({width , height, color ,children} : {width : string, height : string , color :SuggestionChipsColor, children : ReactNode}) {
    const [onClickButton,setOnClickButton] = useState(false)

    const chipsTypeClasses = {
        new : `text-white bg-blue-400` ,
        hot : "text-white bg-red-400" ,
        warning : "text-red-400 bg-red-50" ,
        notification : "text-violet-600 bg-purple-50" ,
        gray : "text-gray-400 bg-gray-100"
    }

  return (
    <>
    <div
      onClick={() => setOnClickButton(!onClickButton)}
      style={{width: `${width}px` , height : `${height}px`}}
      className={`flex gap-[10px] p-[15px] border-none border text-md font-bold justify-center items-center rounded-2xl  
         ${color ? chipsTypeClasses[color]:''}`}
    >
      {children}
    </div>
    </>
  )
}

//호버,액티브인데 나중에 필요하면 쓸 설려고 빼놓음
//hover:bg-purple-100 hover:cursor-pointer focus:bg-purple-100 active:bg-primary-purple-100 active:shadow-lg shadow-xl