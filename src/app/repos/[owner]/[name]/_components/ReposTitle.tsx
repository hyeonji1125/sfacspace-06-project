import { useSession } from "next-auth/react";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

export default function ReposTitle({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex animate-pulse items-center gap-4">
        <div className="h-20 w-20 rounded-full bg-grayscale-10 dark:bg-grayscale-80"></div>
        <div className="h-20 flex-1 rounded-full bg-grayscale-10 dark:bg-grayscale-80"></div>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-4 text-primary-purple-500 dark:text-primary-purple-300">
      <Link href="/repos">
        <IoIosArrowBack className="h-20 w-20 rounded-full border-4 border-primary-purple-500 p-5 dark:border-primary-purple-300" />
      </Link>
      <h2 className="flex-1 select-none rounded-full border-4 border-primary-purple-500 px-8 py-5 text-4xl leading-[36px] dark:border-primary-purple-300">
        {children}
      </h2>
    </div>
  );
}
