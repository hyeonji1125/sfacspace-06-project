"use client";
import Button from "@/components/common/Button";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { HiOutlineChevronDoubleDown } from "react-icons/hi";

export default function HeroSection() {
  const { data: session, status } = useSession();

  return (
    <section className="relative z-20 flex h-[90vh] w-full overflow-hidden text-primary-purple-500 dark:text-custom-dark-text">
      <div className="z-1">
        <Image
          src="/assets/images/circle.svg"
          alt="Background Image"
          fill
          style={{ objectFit: "cover" }}
          className="absolute inset-0 h-full w-full animate-moveCircle dark:opacity-20"
        />
      </div>
      <div className="z-20 flex w-full flex-col items-center justify-center gap-[20px]">
        <div className="text-4xl md:text-6xl">Find your Flaw,</div>
        <div className="flex items-center justify-center rounded-full border-4 border-primary-purple-500 px-[15px] py-[10px] text-4xl tracking-wide dark:border-purple-50 dark:bg-custom-dark-bg md:px-[40px] md:py-[15px] md:text-6xl">
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
              className="px-4 py-[6px] md:px-6 md:py-4"
            >
              <div className="text-lg font-light md:text-2xl">
                {status === "authenticated" ? "파일 분석하러 가기" : "Login"}
              </div>
            </Button>
          </Link>
        </div>
        <HiOutlineChevronDoubleDown
          size={50}
          className="mt-[10vh] animate-float text-primary-purple-500 dark:text-purple-200"
        />
      </div>
    </section>
  );
}
