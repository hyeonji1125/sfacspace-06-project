import { FaDesktop } from "react-icons/fa";

export default function PcOnlyMessage() {
  return (
    <section className="flex h-[90vh] flex-col items-center justify-center gap-3 whitespace-nowrap p-5 sm:gap-6 xl:hidden">
      <FaDesktop className="text-3xl text-primary-purple-500 sm:text-5xl" />
      <div className="text-xl font-bold text-primary-purple-500 sm:text-2xl">
        PC에서 이용해 주세요
      </div>
      <p className="text-sm text-grayscale-40 sm:text-base">
        현재 페이지는 PC 환경에서 최적화되어 있습니다.
      </p>
    </section>
  );
}
