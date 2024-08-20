"use client";
import Button from "@/components/common/Button";
import Image from "next/image";
import { useState } from "react";
import { HiOutlineChevronDoubleDown } from "react-icons/hi";

export default function HeroSection() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <section className="relative z-20 flex h-[90vh] w-full overflow-hidden text-primary-purple-500 dark:font-bold dark:text-purple-50">
        <div className="z-1">
          <Image
            src="/assets/images/circle.svg"
            alt="Background Image"
            fill
            style={{ objectFit: "cover" }}
            className="animate-moveCircle absolute inset-0 h-full w-full dark:opacity-20"
          />
        </div>
        <div className="z-20 flex w-full flex-col items-center justify-center gap-[20px]">
          <div className="text-4xl sm:text-5xl">Find your Flaw,</div>
          <div className="flex items-center justify-center rounded-full border-2 border-primary-purple-500 px-[15px] py-[10px] text-4xl dark:border-purple-50 dark:bg-custom-dark-bg sm:px-[20px] sm:py-[10px] sm:text-5xl">
            FlawDetector
          </div>
          <p className="flex flex-col pt-[10px] md:flex-row">
            <span>인공지능의 뛰어난 분석 능력을 활용하여</span>{" "}
            <span className="md:mx-1">
              코드의 보안 취약점을 신속하게 해결하세요.
            </span>
          </p>
          <div className="mt-[5vh]">
            {isLogin !== true ? (
              <Button theme="filled" size="small" isRound>
                <div className="font-normal">Login</div>
              </Button>
            ) : (
              <Button theme="filled" size="small" isRound>
                <div className="font-normal">파일 분석하러 가기</div>
              </Button>
            )}
          </div>
          <HiOutlineChevronDoubleDown
            size={50}
            className="animate-float mt-[10vh] text-primary-purple-500 dark:text-purple-200"
          />
        </div>
      </section>
    </>
  );
}