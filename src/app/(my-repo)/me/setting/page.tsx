import PageTitle from "@/components/common/PageTitle";
import UserItem from "../../_components/UserItem";
import EmailToggle from "./_components/EmailToggle";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * @todo
 * - toggle onChange patch -> 유저 데이터 변경 (toggle에서 하도록)
 */

export default async function SettingPage() {
  const session = await getServerSession(authOptions);
  const { user } = session ?? {};

  return (
    <>
      <PageTitle>Setting</PageTitle>
      <div className="flex w-full flex-col">
        <UserItem />
        <hr className="my-20 dark:border-text-gray-dark" />
        <div className="flex gap-8 text-2xl text-black dark:text-text-gray-light">
          <h4 className="font-semibold">계정 유형</h4>
          <span className="font-normal">깃허브 연동</span>
        </div>
        <hr className="my-20 dark:border-text-gray-dark" />
        <div className="mb-[87px] flex flex-col gap-12 text-2xl text-black dark:text-text-gray-light">
          <h4 className="font-semibold">계정 유형</h4>
          <EmailToggle />
        </div>
      </div>
    </>
  );
}
