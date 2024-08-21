"use client";

import { motion } from "framer-motion";
import {
  FindingFlawColImg,
  FindingFlawRowImg,
} from "../../../../public/assets/svg/SvgIcons";

export default function FindindFlawSection() {
  return (
    <section className="flex h-full justify-center bg-primary-purple-50 dark:bg-[#160D25]">
      <div className="flex h-[700px] w-full max-w-[1920px] overflow-hidden md:h-[900px] xl:h-[1020px]">
        <div className="relative flex w-full flex-col items-center px-[10%] py-[120px] xl:flex-row xl:py-0">
          <div className="flex flex-col gap-7 text-center xl:gap-[60px] xl:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeIn" }}
              viewport={{ once: true }}
              className="flex flex-col text-4xl font-bold tracking-[-1px] text-primary-purple-500 sm:text-5xl md:text-6xl 2xl:text-[72px]"
            >
              <p className="leading-snug">쉽고 편하게</p>
              <p className="leading-snug">취약점을 발견하다</p>
            </motion.h1>
            <div className="flex flex-col gap-4 xl:gap-7">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeIn" }}
                viewport={{ once: true }}
                className="flex flex-col text-xl font-bold text-custom-text-footer-black dark:text-custom-dark-text sm:text-2xl xl:text-[28px]"
              >
                <p className="leading-snug">코드 보안</p>
                <p className="leading-snug">어떻게 관리하시나요?</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeIn" }}
                viewport={{ once: true }}
                className="flex flex-col text-sm font-medium !leading-normal text-text-gray-default sm:text-base xl:text-lg"
              >
                <p className="whitespace-nowrap">
                  플로디텍터는 안전한 소프트웨어 개발을 위한 필수 도구로,
                </p>
                <p className="whitespace-nowrap">
                  코드의 보안 취약점을 사전에 수정함으로써 개발자들에게 편의와
                </p>
                <p className="whitespace-nowrap">
                  안전한 개발 환경을 제공합니다.
                </p>
              </motion.div>
            </div>
          </div>
          <div className="absolute hidden w-[900px] xl:right-[-350px] xl:block 2xl:right-[-430px] 2xl:w-[1100px]">
            <FindingFlawRowImg />
          </div>
          <div className="absolute bottom-[-150px] w-[300px] md:bottom-[-250px] md:w-[500px] xl:hidden">
            <FindingFlawColImg />
          </div>
        </div>
      </div>
    </section>
  );
}
