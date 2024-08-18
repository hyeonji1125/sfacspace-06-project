"use client";

import Image from "next/image";
import {
  Bubble1,
  Bubble2,
  Bubble3,
} from "../../../../public/assets/svg/SvgIcons";
import { motion } from "framer-motion";

export default function NewestTrendSection() {
  return (
    <section
      id="section3"
      className="h-auto w-full overflow-hidden px-[20px] pt-20 2xl:flex 2xl:h-[1024px] 2xl:max-w-[1920px] 2xl:justify-center 2xl:pl-[192px] 2xl:pr-[145px] 2xl:pt-0"
    >
      <div className="flex h-full flex-grow flex-col items-center justify-between 2xl:flex-row">
        <div className="order-2 mx-auto flex h-full w-full justify-center 2xl:order-1 2xl:mx-0 2xl:w-[725px] 2xl:pt-[94px]">
          <div className="relative flex h-[400px] w-full max-w-[500px] items-center justify-center md:h-[550px] md:max-w-[700px] 2xl:h-[928px] 2xl:max-w-[725px]">
            <Image
              src="/assets/images/Warning.png"
              alt="취약성 실시간 검사중"
              width={725}
              height={980}
              draggable={false}
              className="absolute -bottom-[310px] w-full max-w-[450px] px-10 opacity-90 dark:opacity-90 md:-bottom-[460px] md:max-w-[650px] 2xl:bottom-auto 2xl:top-0 2xl:max-w-[750px] 2xl:px-0 2xl:opacity-100"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: "easeIn", delay: 0.3 }}
              viewport={{ once: true }}
              className="absolute -left-24 top-6 md:-left-28 md:top-12 2xl:left-[270px] 2xl:top-[300px]"
            >
              <Bubble2 className="scale-[0.7] opacity-80 md:scale-[0.9] 2xl:scale-100 2xl:opacity-100" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.2, ease: "easeIn" }}
              viewport={{ once: true }}
              className="absolute -right-60 top-24 md:-right-52 md:top-32 2xl:-right-[150px] 2xl:top-[150px]"
            >
              <Bubble1 className="scale-[0.7] opacity-60 md:scale-[0.9] 2xl:scale-100 2xl:opacity-100" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.4, ease: "easeIn" }}
              viewport={{ once: true }}
              className="absolute left-[12%] top-44 md:top-52 2xl:left-[86px] 2xl:top-[728px]"
            >
              <Bubble3 className="scale-[0.7] md:scale-[0.9] 2xl:scale-100 2xl:opacity-100" />
            </motion.div>
          </div>
        </div>
        <div className="order-1 flex flex-col gap-[34px] text-center 2xl:order-2 2xl:text-right">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeIn" }}
            viewport={{ once: true }}
          >
            <h2 className="inter flex flex-col text-3xl font-bold leading-tight tracking-[-1px] text-primary-purple-500 dark:text-primary-purple-500 md:text-5xl md:leading-tight 2xl:text-6xl 2xl:leading-tight">
              <span className="whitespace-nowrap">최신 보안 동향을</span>
              <span className="whitespace-nowrap">실시간으로 확인하세요.</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeIn" }}
            viewport={{ once: true }}
          >
            <p className="flex flex-col text-sm leading-normal tracking-[-0.2px] text-text-gray-default md:text-base md:leading-normal 2xl:text-xl 2xl:leading-normal">
              <span className="whitespace-nowrap">
                실시간으로 최신 보안 동향을 제공하여
              </span>
              <span className="whitespace-nowrap">
                개발자들이 보안 취약점에 대한 최신 정보를 받을 수 있어
              </span>
              <span className="whitespace-nowrap">
                보안 강화를 위한 코딩 관행을 지속적으로 개선할 수 있습니다.
              </span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
