import PageTitle from "@/components/common/PageTitle";
import EmailToggle from "./_components/EmailToggle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import UserItemWithLogout from "@/app/repos/_components/UserItemWithLogout";

export default async function SettingPage() {
  const session = await getServerSession(authOptions);
  const { user } = session ?? {};

  return (
    <>
      <PageTitle>Setting</PageTitle>
      <div className="flex min-h-[600px] w-full flex-col">
        <UserItemWithLogout />
        <hr className="my-[57px] dark:border-text-gray-dark" />
        <div className="flex w-full flex-col gap-[71px]">
          <div className="flex gap-12 text-2xl text-black dark:text-text-gray-light">
            <h4 className="w-[120px] whitespace-nowrap font-semibold">
              계정 유형
            </h4>
            <span className="w-full font-normal">깃허브 연동</span>
          </div>
          <div className="flex gap-12 text-2xl text-black dark:text-text-gray-light">
            <h4 className="w-[120px] whitespace-nowrap font-semibold">알림</h4>
            <EmailToggle />
          </div>
        </div>
      </div>
    </>
  );
}
