import { Login } from "./_components/Login";
import WaveCircle from "@/components/common/WaveCircle";

export default async function page() {
  return (
    <section className="relative z-20 flex h-[84vh] w-full overflow-hidden text-primary-purple-500 dark:text-custom-dark-text">
      <WaveCircle />
      <div className="z-20 flex w-full flex-col items-center justify-center gap-10 pb-[16vh]">
        <div className="flex w-full flex-col items-center justify-center gap-6">
          <div className="text-4xl font-normal md:text-6xl">
            Find your Flaw,
          </div>
          <Login className="flex items-center justify-center rounded-full border-[3px] border-primary-purple-500 bg-white px-[25px] py-[10px] text-4xl font-normal text-primary-purple-500 hover:shadow-none dark:border-purple-50 dark:bg-custom-dark-bg dark:text-custom-dark-text hover:dark:bg-custom-dark-bg sm:px-[25px] sm:py-[10px] sm:text-4xl md:h-[110px] md:w-[240px] md:border-4 md:px-[40px] md:py-[20px] md:text-6xl">
            Login
          </Login>
        </div>
        <Login>Github로 연동 로그인하기</Login>
      </div>
    </section>
  );
}
