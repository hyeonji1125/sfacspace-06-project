"use client";

import Link from "next/link";
import { BiError } from "react-icons/bi";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <section className="flex h-[93vh] w-full flex-col items-center justify-center gap-8 pb-20 sm:h-[88vh]">
      <div className="flex flex-col items-center gap-4">
        <BiError className="h-[100px] w-[100px] text-primary-purple-500 dark:text-primary-purple-300 sm:h-[120px] sm:w-[120px]" />
        <h2 className="text-xl font-bold text-primary-purple-500 dark:text-primary-purple-300 sm:text-3xl">
          에러가 발생했어요!
        </h2>
        <p className="text-center text-sm text-grayscale-40 dark:text-text-gray-default sm:text-base">
          예상치 못한 에러가 발생했어요. <br />
          error: {error.message}
        </p>
      </div>
      <button
        type="button"
        className="rounded-full bg-primary-purple-500 px-6 py-2 text-base font-medium text-white hover:shadow-lg dark:bg-primary-purple-300 dark:font-semibold dark:text-custom-dark-bg dark:hover:bg-primary-purple-200 sm:text-lg"
        onClick={() => reset()}
      >
        다시 시도하기
      </button>
    </section>
  );
}
