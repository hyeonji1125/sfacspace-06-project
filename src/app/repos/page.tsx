import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import LibraryLogin from "./_components/LibraryLogin";
import LibraryTitle from "./_components/LibraryTitle";
import UserItem from "@/components/common/UserItem";
import RepositoryList from "./_components/RepositoryList";
import { CaretRight } from "../../../public/assets/svg/SvgIcons";
import Link from "next/link";

export default async function MyLibraryPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <LibraryLogin />;
  }

  return (
    <div className="mx-auto mb-[124px] mt-[72px] flex w-full min-w-[1024px] max-w-[1314px] flex-col items-center gap-[124px] px-20">
      <LibraryTitle type="LIBRARY" />
      <div className="flex w-full flex-col gap-7">
        <Link
          href="/me"
          className="flex items-center justify-between rounded-[42px] bg-grayscale-5 p-8 dark:bg-opacity-10"
        >
          <UserItem />
          <CaretRight
            className="h-12 w-12"
            color="dark:fill-custom-dark-text"
          />
        </Link>
        <RepositoryList />
      </div>
    </div>
  );
}
