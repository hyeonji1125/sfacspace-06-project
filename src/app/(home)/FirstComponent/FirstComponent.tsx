'use client'
import Button from "@/components/common/Button";
import Image from "next/image";
import { useState } from "react";
import { HiOutlineChevronDoubleDown } from "react-icons/hi";


export default function FirstComponent() {
  const [isLogin,setIsLogin] = useState(false)

  return (
    <>
      <div className="relative flex w-full h-[87vh] text-purple-700 overflow-hidden dark:text-purple-50 dark:font-bold z-20">   
        <div className="z-1">
        <Image
          src="/assets/images/circle.svg"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 w-full h-full"
        />
        </div>
        <div className="flex flex-col gap-[10px] md:gap-[20px] w-full justify-center items-center z-20">
          <div className=" md:text-5xl">Find your Flaw,</div>
          <div className=" md:text-5xl md:p-[20px] flex border-2 border-purple-700 rounded-full p-[10px] sm:p-[15px] items-center justify-center dark:border-purple-50 ">FlawDetector</div>
          <div className="flex flex-col md:flex-row "><div>인공지능의 뛰어난 분석 능력을 활용하여</div> <div>코드의 보안 취약점을 신속하게 해결하세요.</div></div>
          <div className="mt-[5vh]">
          {isLogin !== true ? <Button theme="filled" size="small" isRound><div className="font-normal">Login</div></Button> 
          : <Button theme="filled" size="small" isRound><div className="font-normal">파일 분석하러 가기</div></Button>}
</div>  
          <HiOutlineChevronDoubleDown size={50} className="text-primary-purple-500 mt-[10vh] animate-float dark:text-purple-200"/>
        </div>
      </div>
    </>
  );
}