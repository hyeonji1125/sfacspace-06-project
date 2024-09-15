import Link from "next/link";
import LibraryTitle from "./LibraryTitle";
import PcOnlyMessage from "@/components/common/PcOnlyMessage";

export default function LibraryLogin() {
  return (
    <>
      <PcOnlyMessage />
      <section className="relative hidden h-[90vh] w-full flex-col items-center justify-center overflow-hidden xl:flex">
        <div className="absolute inset-0 h-full w-full animate-moveCircle bg-[url('/assets/images/circle.svg')] bg-cover bg-center dark:opacity-20" />
        <div className="-mt-20 flex w-full flex-col items-center justify-center gap-[60px] text-primary-purple-500">
          <LibraryTitle
            className="relative dark:text-custom-dark-text"
            type="LOGIN"
          />
          <div className="relative flex flex-col items-center gap-[22px]">
            <p className="text-xl font-normal dark:text-text-gray-light">
              깃허브와 연동하여 내 코드 파일을 불러오세요.
            </p>
            <Link
              href="/login"
              className="rounded-full bg-primary-purple-500 px-6 py-2 text-[28px] font-extralight text-white hover:shadow-lg"
            >
              Login
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
