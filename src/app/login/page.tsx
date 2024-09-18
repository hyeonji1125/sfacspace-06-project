import { cookies } from "next/headers";
import Image from "next/image";
import { Login } from "./_components/Login";
import { Logout } from "./_components/Logout";
import WaveCircle from "@/components/common/WaveCircle";

export default async function page() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("next-auth.session-token");

  return (
    <section className="relative z-20 flex h-[84vh] w-full overflow-hidden text-primary-purple-500 dark:font-bold dark:text-purple-50">
      <WaveCircle />
      <div className="z-20 flex w-full flex-col items-center justify-center gap-[40px] pb-[16vh]">
        <div className="text-4xl sm:text-5xl">Find your Flaw,</div>
        <div className="flex items-center justify-center rounded-full border-2 border-primary-purple-500 px-[25px] py-[10px] text-4xl dark:border-purple-50 dark:bg-custom-dark-bg sm:px-[40px] sm:py-[20px] sm:text-5xl">
          Login
        </div>
        {sessionToken ? <Logout /> : <Login />}
      </div>
    </section>
  );
}
