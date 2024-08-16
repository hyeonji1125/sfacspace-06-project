'use client'
import Button from "@/components/common/Button";
import Image from "next/image";
import { useState } from "react";
import { HiOutlineChevronDoubleDown } from "react-icons/hi";


export default function HeroSection() {
  const [isLogin,setIsLogin] = useState(false)

  return (
    <>
      <div className="relative flex w-full h-[87vh] text-primary-purple-500 overflow-hidden dark:text-purple-50 dark:font-bold z-20">   
        <div className="z-1">
        <Image
          src="/assets/images/circle.svg"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 w-full h-full dark:opacity-20 animate-moveCircle"
        />
        </div>
        <div className="flex flex-col gap-[20px] w-full justify-center items-center z-20">
          <div className="text-4xl sm:text-5xl ">Find your Flaw,</div>
          <div className="text-4xl sm:text-5xl flex border-2 border-primary-purple-500 rounded-full px-[15px] py-[10px] sm:py-[10px] sm:px-[20px] items-center justify-center dark:border-purple-50 dark:bg-custom-dark-bg">FlawDetector</div>
          <p className="flex flex-col pt-[10px] md:flex-row "><span>인공지능의 뛰어난 분석 능력을 활용하여</span> <span className="md:mx-1">코드의 보안 취약점을 신속하게 해결하세요.</span></p>
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