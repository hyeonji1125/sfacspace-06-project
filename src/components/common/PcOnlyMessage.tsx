import { FaDesktop } from "react-icons/fa";

export default function PcOnlyMessage() {
  return (
    <section className="flex h-[93vh] flex-col items-center justify-center gap-6 whitespace-nowrap p-5 sm:h-[88vh] sm:gap-8 xl:hidden">
      <FaDesktop className="h-20 w-20 text-primary-purple-500 dark:text-primary-purple-300 sm:text-5xl md:h-[100px] md:w-[100px]" />
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-xl font-bold text-primary-purple-500 dark:text-primary-purple-300 sm:text-3xl">
          화면 크기를 조정해 주세요
        </h2>
        <p className="text-center text-sm text-grayscale-40 dark:text-text-gray-default sm:text-base">
          이 페이지는 가로 화면 크기 1280px 이상의 환경에 최적화되어 있습니다.
          <br />
          원활한 이용을 위해 권장 해상도로 브라우저 창을 조정해 주세요.
        </p>
      </div>
    </section>
  );
}
