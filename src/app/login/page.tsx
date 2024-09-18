import { cookies } from "next/headers";
import Image from "next/image";
import { Login } from "./_components/Login";
import { Logout } from "./_components/Logout";
import WaveCircle from "@/components/common/WaveCircle";

export default async function page() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("next-auth.session-token");

  return (
    <section className="relative z-20 flex h-[84vh] w-full overflow-hidden text-primary-purple-500 dark:text-custom-dark-text">
      <WaveCircle />
      <div className="z-20 flex w-full flex-col items-center justify-center gap-[40px] pb-[16vh]">
        <div className="text-4xl md:text-5xl">Find your Flaw,</div>

        <Login className="flex items-center justify-center rounded-full border-4 border-primary-purple-500 px-[25px] py-[10px] text-4xl dark:border-purple-50 dark:bg-custom-dark-bg dark:text-custom-dark-text hover:dark:bg-custom-dark-bg sm:px-[25px] sm:py-[10px] sm:text-4xl md:h-[110px] md:w-[240px] md:px-[40px] md:py-[20px] md:text-6xl">
          Login
        </Login>
        <Login>Github로 연동 로그인하기</Login>
      </div>
    </section>
  );
}
