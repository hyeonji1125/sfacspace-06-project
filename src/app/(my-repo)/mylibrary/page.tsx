import { getServerSession } from "next-auth";
import LibraryList from "../_components/LibraryList";
import UserItem from "../_components/UserItem";
import { authOptions } from "@/lib/auth";
import LibraryLogin from "./_components/LibraryLogin";
import LibraryTitle from "./_components/LibraryTitle";

export default async function MyLibraryPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <LibraryLogin />;
  }

  return (
    <div className="mx-auto mb-[124px] mt-[72px] flex w-full min-w-[1024px] max-w-[1314px] flex-col items-center gap-[124px] px-20">
      <LibraryTitle type="LIBRARY" />
      <div className="flex w-full flex-col">
        <UserItem buttonType="PROFILE" />
        <hr className="my-20 dark:border-text-gray-dark" />
        <LibraryList type="REPO" className="h-[696px]" />
      </div>
    </div>
  );
}
