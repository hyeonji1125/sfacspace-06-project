"use client";
import Button from "@/components/common/Button";
import WaveCircle from "@/components/common/WaveCircle";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { HiOutlineChevronDoubleDown } from "react-icons/hi";

export default function HeroSection() {
  const { data: session, status } = useSession();
  const flawSectionRef = useRef<HTMLDivElement | null>(null); // Ref를 생성하여 FindingFlawSection에 연결
  const scrollToNextSection = () => {
    if (flawSectionRef.current) {
      const componentHeight = flawSectionRef.current.scrollHeight; // 컴포넌트의 전체 높이 가져오기
      const componentTop = flawSectionRef.current.offsetTop; // 컴포넌트의 최상단 위치 가져오기
      const scrollPosition = componentTop + componentHeight; // 최상단 위치에 컴포넌트 전체 높이를 더해서 최하단 위치 계산

      window.scrollTo({
        top: scrollPosition, // 컴포넌트의 전체 높이만큼 스크롤
        behavior: "smooth", // 부드러운 스크롤
      });
    }
  };

  return (
    <section className="relative z-20 flex h-[90vh] w-full overflow-hidden text-primary-purple-500 dark:text-custom-dark-text">
      <WaveCircle />
      <div className="z-20 flex w-full flex-col items-center justify-center gap-[20px]">
        <div className="text-4xl md:text-6xl">Find your Flaw,</div>
        <div className="flex items-center justify-center rounded-full border-4 border-primary-purple-500 bg-white px-[15px] py-[10px] text-4xl tracking-wide dark:border-purple-50 dark:bg-custom-dark-bg md:px-[40px] md:py-[15px] md:text-6xl">
          FlawDetector
        </div>
        <p className="flex flex-col items-center pt-[10px] text-base md:text-xl lg:flex-row">
          <span>인공지능의 뛰어난 분석 능력을 활용하여</span>
          <span className="md:mx-1">
            코드의 보안 취약점을 신속하게 해결하세요.
          </span>
        </p>
        <div className="mt-[5vh]">
          <Link href={status === "authenticated" ? "/repos" : "/login"}>
            <Button
              theme="filled"
              size="small"
              isRound
              className="px-4 py-[6px] dark:bg-primary-purple-300 dark:text-custom-dark-bg hover:dark:bg-primary-purple-200 md:h-[56px] md:px-6 md:py-4"
            >
              <div className="text-lg font-light dark:font-normal md:text-2xl">
                {status === "authenticated" ? "파일 분석하러 가기" : "Login"}
              </div>
            </Button>
          </Link>
        </div>
        <HiOutlineChevronDoubleDown
          size={50}
          className="z-20 mt-[10vh] animate-float cursor-pointer text-primary-purple-500 dark:text-primary-purple-100"
          onClick={scrollToNextSection}
        />
      </div>
      <div ref={flawSectionRef}></div>
    </section>
  );
}
