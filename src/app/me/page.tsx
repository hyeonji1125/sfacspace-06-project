import PageTitle from "@/components/common/PageTitle";
import Input from "@/components/common/Input";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import UserItemWithLogout from "../repos/_components/UserItemWithLogout";
import { profileLinks } from "./_constants/profileLinks";

/**
 * @todo
 * - 유저 데이터 없는 경우 redirect "/login"
 */

export default async function MePage() {
  const session = await getServerSession(authOptions);
  const { user } = session ?? {};

  return (
    <div className="mx-auto mb-[124px] mt-[72px] flex w-full min-w-[1024px] max-w-[1314px] flex-col items-center gap-[124px] px-20">
      <PageTitle link="/repos">Profile Information</PageTitle>
      <div className="flex w-full flex-col">
        <UserItemWithLogout />
        <hr className="my-20 dark:border-text-gray-dark" />
        <div className="flex flex-col gap-12">
          <h3 className="text-[32px] font-semibold text-black dark:text-custom-dark-text">
            내 정보
          </h3>
          <div className="flex flex-col gap-4">
            <h4 className="text-2xl text-text-gray-dark dark:text-text-gray-default">
              계정(깃허브 연동)
            </h4>
            {user?.email && (
              <Input
                disabled
                className="w-[842px] text-text-gray-light dark:text-text-gray-dark"
                value={user.email}
              />
            )}
          </div>
        </div>
        <hr className="my-20 dark:border-text-gray-dark" />
        <ul className="flex flex-col gap-9">
          {profileLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.path}>
                <h4 className="text-2xl text-text-gray-dark dark:text-text-gray-default">
                  {link.name}
                </h4>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
