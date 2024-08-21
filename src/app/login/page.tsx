import { cookies } from "next/headers";
import Image from "next/image";
import { Login } from "./_components/Login";
import { Logout } from "./_components/Logout";


export default async function page() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('next-auth.session-token');

  return (
    <section className="relative flex w-full h-[84vh] text-primary-purple-500 overflow-hidden dark:text-purple-50 dark:font-bold z-20">
      <Image
        src="/assets/images/circle.svg"
        alt="Background Image"
        fill
        className="absolute inset-0 w-full h-full object-cover dark:opacity-20 animate-moveCircle"
      />
      <div className="pb-[16vh] flex flex-col gap-[40px] w-full justify-center items-center z-20">
        <div className="text-4xl sm:text-5xl ">Find your Flaw,</div>
        <div className="text-4xl sm:text-5xl flex border-2 border-primary-purple-500 rounded-full px-[25px] py-[10px] sm:py-[20px] sm:px-[40px] items-center justify-center dark:border-purple-50 dark:bg-custom-dark-bg">Login</div>
        {sessionToken ? <Logout /> : <Login />}
      </div>
    </section>
  )
}
