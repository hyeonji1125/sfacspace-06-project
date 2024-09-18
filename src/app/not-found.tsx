import Link from "next/link";
import { TbError404Off } from "react-icons/tb";

export default function NotFoundPage() {
  return (
    <section className="flex h-[93vh] w-full flex-col items-center justify-center gap-8 pb-20 sm:h-[88vh]">
      <div className="flex flex-col items-center gap-4">
        <TbError404Off className="h-[100px] w-[100px] text-primary-purple-500 dark:text-primary-purple-300 sm:h-[120px] sm:w-[120px]" />
        <h2 className="text-xl font-bold text-primary-purple-500 dark:text-primary-purple-300 sm:text-3xl">
          페이지를 찾을 수 없어요!
        </h2>
        <p className="text-center text-sm text-grayscale-40 dark:text-text-gray-default sm:text-base">
          존재하지 않는 페이지입니다. <br />
          페이지 경로를 다시 확인해주세요.
        </p>
      </div>
      <Link
        href="/"
        className="rounded-full bg-primary-purple-500 px-6 py-2 text-base font-medium text-white hover:shadow-lg dark:bg-primary-purple-300 dark:font-semibold dark:text-custom-dark-bg dark:hover:bg-primary-purple-200 sm:text-lg"
      >
        홈으로 가기
      </Link>
    </section>
  );
}
