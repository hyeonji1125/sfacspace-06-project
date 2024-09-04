import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

export default function ReposTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 text-primary-purple-500">
      <Link href="/repos">
        <IoIosArrowBack className="h-20 w-20 rounded-full border-4 border-primary-purple-500 p-5" />
      </Link>
      <h2 className="flex-1 select-none rounded-full border-4 border-primary-purple-500 px-8 py-5 text-[40px] leading-[36px]">
        {children}
      </h2>
    </div>
  );
}
